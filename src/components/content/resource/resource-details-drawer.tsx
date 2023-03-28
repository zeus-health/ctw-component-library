import { UseQueryResult } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";
import { DocumentButton } from "../CCDA/document-button";
import { useCCDAModal } from "../CCDA/modal-ccda";
import { History, HistoryEntries } from "./helpers/history";
import {
  DetailsCard,
  DetailsProps,
} from "@/components/content/resource/helpers/details-card";
import { Drawer } from "@/components/core/drawer";
import { Loading } from "@/components/core/loading";
import { useCTW } from "@/components/core/providers/ctw-provider";
import { useDrawer } from "@/components/core/providers/drawer-provider";
import { getBinaryId } from "@/fhir/binaries";
import { DocumentModel } from "@/fhir/models/document";
import { FHIRModel } from "@/fhir/models/fhir-model";
import { searchProvenances } from "@/fhir/provenance";

const HISTORY_PAGE_LIMIT = 10;

export type UseResourceDetailsDrawerProps<
  T extends fhir4.Resource,
  M extends FHIRModel<T>
> = Pick<
  ResourceDetailsDrawerProps<T, M>,
  "header" | "subHeader" | "getSourceDocument" | "details" | "getHistory"
>;

export function useResourceDetailsDrawer<
  T extends fhir4.Resource,
  M extends FHIRModel<T>
>(props: UseResourceDetailsDrawerProps<T, M>) {
  const { openDrawer } = useDrawer();

  return (model: M) => {
    openDrawer({
      component: (drawerProps) => (
        <ResourceDetailsDrawer model={model} {...props} {...drawerProps} />
      ),
    });
  };
}

type ResourceDetailsDrawerProps<
  T extends fhir4.Resource,
  M extends FHIRModel<T>
> = {
  className?: string;
  model: M;
  header: (model: M) => ReactNode;
  subHeader?: (model: M) => ReactNode;
  getSourceDocument?: boolean;
  details: (model: M) => DetailsProps["details"];
  getHistory?: (model: M) => UseQueryResult<HistoryEntries | undefined>;
  isOpen: boolean;
  onClose: () => void;
};

function ResourceDetailsDrawer<
  T extends fhir4.Resource,
  M extends FHIRModel<T>
>({
  className,
  model,
  details,
  header,
  subHeader,
  getHistory,
  getSourceDocument,
  isOpen,
  onClose,
}: ResourceDetailsDrawerProps<T, M>) {
  const openCCDAModal = useCCDAModal();
  const [isLoading, setIsLoading] = useState(false);
  const [binaryId, setBinaryId] = useState<string>();
  const { getRequestContext } = useCTW();
  const history = getHistory && getHistory(model);

  // We optionally look for any associated binary CCDAs
  // if getSourceDocument is true.
  useEffect(() => {
    async function load() {
      setIsLoading(true);
      const requestContext = await getRequestContext();
      const provenances = await searchProvenances(requestContext, [model]);
      setBinaryId(getBinaryId(provenances, model.id));
      setIsLoading(false);
    }

    if (model instanceof DocumentModel) {
      // Special handling for document models
      // which already have a binaryID.
      setBinaryId(model.binaryID);
    } else if (getSourceDocument) {
      void load();
    }
  }, [getSourceDocument, model, getRequestContext]);

  return (
    <Drawer
      className={className}
      title={model.resourceTypeTitle}
      isOpen={isOpen}
      onClose={onClose}
      showCloseFooter
    >
      <Drawer.Body>
        <div className="ctw-py-2">
          <div className="ctw-text-2xl">{header(model)}</div>
          {subHeader && <div className="ctw-text-sm">{subHeader(model)}</div>}
        </div>

        {isLoading ? (
          <Loading message="Loading data..." />
        ) : (
          <DetailsCard
            details={details(model)}
            documentButton={
              binaryId && (
                <DocumentButton
                  onClick={() =>
                    openCCDAModal(binaryId, model.resourceTypeTitle)
                  }
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
      </Drawer.Body>
    </Drawer>
  );
}
