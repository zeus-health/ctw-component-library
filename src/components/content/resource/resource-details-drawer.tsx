import { ReactNode, useEffect, useState } from "react";
import { History, HistoryEntries } from "./helpers/history";
import { DocumentButton } from "../CCDA/document-button";
import { useCCDAModal } from "../CCDA/modal-ccda";
import { DetailsCard, DetailsProps } from "@/components/content/resource/helpers/details-card";
import { Drawer } from "@/components/core/drawer";
import { Loading } from "@/components/core/loading";
import { useDrawer } from "@/components/core/providers/drawer-provider";
import { useCTW } from "@/components/core/providers/use-ctw";
import { useUserBuilderId } from "@/components/core/providers/user-builder-id";
import { getBinaryId } from "@/fhir/binaries";
import { DocumentModel } from "@/fhir/models/document";
import { FHIRModel } from "@/fhir/models/fhir-model";
import { searchProvenances } from "@/fhir/provenance";
import { useFQSFeatureToggle } from "@/hooks/use-feature-toggle";
import { UseQueryResultBasic } from "@/utils/request";

const HISTORY_PAGE_LIMIT = 20;

export type UseResourceDetailsDrawerProps<T extends fhir4.Resource, M extends FHIRModel<T>> = Pick<
  ResourceDetailsDrawerProps<T, M>,
  | "header"
  | "subHeader"
  | "getSourceDocument"
  | "details"
  | "getHistory"
  | "readOnly"
  | "onEdit"
  | "onRemove"
  | "enableFQS"
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
  onEdit?: (model: M) => void;
  onRemove?: (model: M, onDelete?: (model: M) => void) => void;
  readOnly?: boolean;
  subHeader?: (model: M) => ReactNode;
  enableFQS?: boolean;
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
  onEdit,
  onRemove,
  readOnly,
  subHeader,
}: ResourceDetailsDrawerProps<T, M>) {
  const openCCDAModal = useCCDAModal();
  const [isLoading, setIsLoading] = useState(false);
  const [binaryId, setBinaryId] = useState<string>();
  const { getRequestContext } = useCTW();
  const fqsProvenances = useFQSFeatureToggle("provenances");
  const history = getHistory && getHistory(model);
  const userBuilderId = useUserBuilderId();

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
      // Special handling for document models
      // which already have a binaryID.
      setBinaryId(model.binaryId);
    } else if (getSourceDocument && fqsProvenances.ready) {
      void load();
    }
  }, [getSourceDocument, model, getRequestContext, fqsProvenances.enabled, fqsProvenances.ready]);

  return (
    <Drawer className={className} title={model.resourceTypeTitle} isOpen={isOpen} onClose={onClose}>
      <Drawer.Body>
        <div className="ctw-space-y-4">
          <div className="ctw-space-y-2">
            <div className="ctw-text-3xl">{header(model)}</div>
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
                    onClick={() => openCCDAModal(binaryId, model.resourceTypeTitle)}
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
        </div>
      </Drawer.Body>
      <Drawer.Footer>
        <div className="ctw-flex ctw-justify-between">
          <Drawer.CloseButton onClose={onClose} label="Close" />
          <div className="ctw-space-x-3">
            {!readOnly && onRemove && model.ownedByBuilder(userBuilderId) && (
              <button
                type="button"
                className="ctw-btn-default ctw-w-24"
                data-zus-telemetry-click="Remove button"
                onClick={() => {
                  // Leave the drawer open while the remove
                  // confirmation modal is open.
                  // And close the drawer if resource is removed.
                  onRemove(model, onClose);
                }}
              >
                Remove
              </button>
            )}

            {!readOnly && onEdit && model.ownedByBuilder(userBuilderId) && (
              <button
                type="button"
                className="ctw-btn-primary ctw-w-24"
                data-zus-telemetry-click="Edit button"
                onClick={() => {
                  onClose();
                  onEdit(model);
                }}
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </Drawer.Footer>
    </Drawer>
  );
}
