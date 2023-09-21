import cx from "classnames";
import { ReactNode, useEffect, useState } from "react";
import { History, HistoryEntries } from "./helpers/history";
import { Notes } from "./helpers/notes";
import { useAdditionalResourceActions } from "./use-additional-resource-actions";
import { DocumentButton } from "../CCDA/document-button";
import { useCCDAModal } from "../CCDA/modal-ccda";
import { DetailsCard, DetailsProps } from "@/components/content/resource/helpers/details-card";
import { Drawer } from "@/components/core/drawer";
import { Loading } from "@/components/core/loading";
import { useAnalytics } from "@/components/core/providers/analytics/use-analytics";
import { useDrawer } from "@/components/core/providers/drawer-provider";
import { useCtwThemeRef } from "@/components/core/providers/theme/use-ctw-theme-ref";
import { useCTW } from "@/components/core/providers/use-ctw";
import { RowActionsConfigProp } from "@/components/core/table/table-rows";
import { getBinaryId } from "@/fhir/binaries";
import { DocumentModel } from "@/fhir/models/document";
import { EncounterModel } from "@/fhir/models/encounter";
import { FHIRModel } from "@/fhir/models/fhir-model";
import { searchProvenances } from "@/fhir/provenance";
import { useBreakpoints } from "@/hooks/use-breakpoints";
import { useFQSFeatureToggle } from "@/hooks/use-feature-toggle";
import { sortBy } from "@/utils/nodash";
import { UseQueryResultBasic } from "@/utils/request";

const HISTORY_PAGE_LIMIT = 20;

export type UseResourceDetailsDrawerProps<T extends fhir4.Resource, M extends FHIRModel<T>> = Pick<
  ResourceDetailsDrawerProps<T, M>,
  | "header"
  | "subHeader"
  | "getSourceDocument"
  | "details"
  | "getHistory"
  | "rowActions"
  | "enableDismissAndReadActions"
>;

export function useResourceDetailsDrawer<T extends fhir4.Resource, M extends FHIRModel<T>>(
  props: UseResourceDetailsDrawerProps<T, M>
) {
  const { openDrawer } = useDrawer();

  return (model: M) => {
    openDrawer({
      component: (drawerProps) => (
        <ResourceDetailsDrawer model={model} {...props} {...drawerProps} />
      ),
      trackingMetadata: { resourceType: model.resourceType },
    });
  };
}

type ResourceDetailsDrawerProps<T extends fhir4.Resource, M extends FHIRModel<T>> = {
  className?: string;
  details: (model: M) => DetailsProps["details"];
  getHistory?: (model: M) => UseQueryResultBasic<HistoryEntries | undefined>;
  getSourceDocument?: boolean;
  header: (model: M) => ReactNode;
  isOpen: boolean;
  model: M;
  onClose: () => void;
  rowActions?: (model: M) => RowActionsConfigProp<M>;
  enableDismissAndReadActions?: boolean;
  subHeader?: (model: M) => ReactNode;
};

function ResourceDetailsDrawer<T extends fhir4.Resource, M extends FHIRModel<T>>({
  className,
  details,
  getHistory,
  getSourceDocument,
  header,
  isOpen,
  model,
  onClose,
  rowActions,
  enableDismissAndReadActions,
  subHeader,
}: ResourceDetailsDrawerProps<T, M>) {
  const openCCDAModal = useCCDAModal();
  const ctwThemeRef = useCtwThemeRef();
  const [isLoading, setIsLoading] = useState(false);
  const [binaryId, setBinaryId] = useState<string>();
  const { getRequestContext } = useCTW();
  const fqsProvenances = useFQSFeatureToggle("provenances");
  const history = getHistory && getHistory(model);
  const breakpoints = useBreakpoints(ctwThemeRef);

  // We optionally look for any associated binary CCDAs
  // if getSourceDocument is true.
  useEffect(() => {
    async function load() {
      setIsLoading(true);
      const requestContext = await getRequestContext();
      const provenances = await searchProvenances(requestContext, [model], fqsProvenances.enabled);
      setBinaryId(getBinaryId(provenances, model.id));
      setIsLoading(false);
    }

    if (model instanceof DocumentModel) {
      // Special handling for document models which already have a binaryID.
      setBinaryId(model.binaryId);
    } else if (getSourceDocument && fqsProvenances.ready) {
      void load();
    }
  }, [getSourceDocument, model, getRequestContext, fqsProvenances.enabled, fqsProvenances.ready]);

  const rowActionsWithAdditions = useAdditionalResourceActions({
    rowActions,
    enableDismissAndReadActions,
  });

  // We call rowActions right away so we'll know if it returns null and thus we should
  // hide our footer.
  const actions = rowActionsWithAdditions({
    record: model,
    onSuccess: onClose,
    stacked: breakpoints.xs,
  });
  const { trackInteraction } = useAnalytics();

  return (
    <Drawer className={className} title={model.resourceTypeTitle} isOpen={isOpen} onClose={onClose}>
      <Drawer.Body>
        <div className="ctw-space-y-4">
          <div className="ctw-space-y-2 ctw-px-2">
            <div className={cx(breakpoints.xs ? "ctw-text-2xl" : "ctw-text-3xl")}>
              {header(model)}
            </div>
            {subHeader && <div>{subHeader(model)}</div>}
          </div>

          {isLoading ? (
            <Loading message="Loading data..." />
          ) : (
            <DetailsCard
              details={details(model)}
              documentButton={
                binaryId && (
                  <DocumentButton
                    onClick={() => {
                      trackInteraction(`open_source_document`, {
                        target: "resource_details_drawer",
                      });
                      return openCCDAModal(binaryId, model.resourceTypeTitle);
                    }}
                    text="Source Document"
                  />
                )
              }
            />
          )}

          {history &&
            (history.isLoading ? (
              <Loading message="Loading history..." />
            ) : (
              <History
                entries={history.data ?? []}
                limit={HISTORY_PAGE_LIMIT}
                resourceTypeTitle={model.resourceTypeTitle}
              />
            ))}

          {model instanceof EncounterModel && model.clinicalNotes.length > 0 && (
            <Notes entries={sortBy(model.clinicalNotes, "title")} />
          )}
        </div>
      </Drawer.Body>
      {actions && (
        <Drawer.Footer>
          <div className="ctw-flex ctw-justify-between">
            <Drawer.CloseButton onClose={onClose} label="Close" />
            {actions}
          </div>
        </Drawer.Footer>
      )}
    </Drawer>
  );
}
