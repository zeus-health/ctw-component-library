import { ZusAggregatedProfile } from "../zus-aggregated-profile/zus-aggregated-profile";

export type PatientConditionsProfileProps = {
  hideRequestRecords: boolean;
  readOnly?: boolean;
};

export const PatientConditionsProfile = ({
  hideRequestRecords,
  readOnly,
}: PatientConditionsProfileProps) => (
  // TODO: 2. How can we get filters/sort selections to persist?
  <ZusAggregatedProfile
    hideTitle
    resources={["conditions", "conditions-outside"]}
    conditionsProps={{ readOnly }}
    conditionsOutsideProps={{ hideRequestRecords, readOnly }}
  />
);
