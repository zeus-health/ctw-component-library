import { PatientSearchProps } from "./patients-search";
import ZusSVG from "@/assets/zus.svg";
import { withErrorBoundary } from "@/components/core/error-boundary";

export const PatientSearch = withErrorBoundary(
  ({ pageSize = 250, onSearchClick }: PatientSearchProps) => (
    <div className="ctw-max-w-3xl ctw-space-y-5 ctw-text-center">
      <h3 className="ctw-my-0 ctw-text-2xl ctw-font-medium">Search Your Patients</h3>
      <div className="ctw-flex ctw-justify-center ctw-space-x-2 ctw-text-sm ctw-font-light ctw-italic ctw-text-content-light">
        <span>Powered by</span>
        <img src={ZusSVG} alt="Zus" />
      </div>
      <PatientSearch pageSize={pageSize} onSearchClick={onSearchClick} />
    </div>
  ),
  "PatientsSearch"
);
