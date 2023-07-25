import { DiagnosticReportModel, ObservationModel } from "@/fhir/models";
import { ResourceMap } from "@/fhir/types";
import { isEqual, uniqWith } from "@/utils/nodash";

export const applyDiagnosticReportFilters = (
  data: fhir4.DiagnosticReport[],
  includedResources?: ResourceMap, 
  trends?: ObservationModel[]
) => {
  const diagnosticModel = data.map((dr) => new DiagnosticReportModel(dr, includedResources, undefined, trends));
  const diagnosticReportData = uniqWith(diagnosticModel, (a, b) =>
    isEqual(valuesToDedupeOn(a), valuesToDedupeOn(b))
  );

  return diagnosticReportData;
};

const valuesToDedupeOn = (dr: DiagnosticReportModel) => [dr.displayName, dr.effectiveStart];
