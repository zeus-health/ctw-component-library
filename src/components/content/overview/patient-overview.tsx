import { PatientHistoryLastRetrievedWithAction } from "../patient-history/patient-history-action";
import { PatientRecordSearch } from "../patient-record-search/patient-record-search";
import { withErrorBoundary } from "@/components/core/error-boundary";

export type PatientOverviewProps = {
  includePatientDemographicsForm?: boolean;
};

export const PatientOverviewComponent = ({
  includePatientDemographicsForm,
}: PatientOverviewProps) => (
  <div className="ctw-grid-auto-columns ctw-flex ctw-w-full ctw-flex-col ctw-pt-5 max-sm:ctw-space-y-5 sm:ctw-flex-row">
    <div className="ctw-mx-2 ctw-h-fit ctw-basis-2/6 ctw-rounded-lg ctw-border ctw-border-solid ctw-border-divider-light">
      <div className="ctw-space-y-2 ctw-p-2">
        <div className="ctw-px-3 ctw-pt-3">
          <PatientHistoryLastRetrievedWithAction
            includePatientDemographicsForm={includePatientDemographicsForm}
          />
        </div>
        <div className="ctw-border-0 ctw-border-t ctw-border-solid ctw-border-divider-light ctw-px-3 ctw-pt-3">
          <div className="ctw-pb-2">
            <a
              href="https://share.hsforms.com/10NmAPiu7Qd2OXbxAHnseiwcjai8"
              className="ctw-link"
              target="_blank"
              rel="noreferrer"
            >
              Share ZAP Feedback
            </a>
          </div>
          <div>
            <a
              href="https://docs.zushealth.com/changelog"
              className="ctw-link"
              target="_blank"
              rel="noreferrer"
            >
              What&apos;s New?
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className="ctw-basis-4/6 ctw-px-2">
      <PatientRecordSearch />
    </div>
  </div>
);

export const PatientOverview = withErrorBoundary(PatientOverviewComponent, "PatientOverview");
