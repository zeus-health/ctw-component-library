import { ZusAggregatedProfile } from "../zus-aggregated-profile/zus-aggregated-profile";

export type PatientConditionsProfileProps = {
  hideRequestRecords?: boolean;
  enableFQS?: boolean;
  readOnly?: boolean;
};

export const PatientConditionsProfile = ({
  hideRequestRecords,
  enableFQS = false,
  readOnly,
}: PatientConditionsProfileProps) => (
  <ZusAggregatedProfile
    hideTitle
    resources={["conditions", "conditions-outside"]}
    conditionsProps={{ readOnly, enableFQS }}
    conditionsOutsideProps={{ hideRequestRecords, readOnly, enableFQS }}
  />
);
