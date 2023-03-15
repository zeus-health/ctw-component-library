import { ZusAggregatedProfile } from "../zus-aggregated-profile/zus-aggregated-profile";

export type PatientMedicationsProfileProps = {
  readOnly?: boolean;
};

export const PatientMedicationsProfile = ({
  readOnly,
}: PatientMedicationsProfileProps) => (
  <ZusAggregatedProfile
    hideTitle
    resources={["medications", "medications-outside"]}
    medicationsProps={{ readOnly }}
    medicationsOutsideProps={{ readOnly }}
  />
);
