import {
  ZusAggregatedProfile,
  ZusAggregatedProfileProps,
} from "../zus-aggregated-profile/zus-aggregated-profile";
import { PatientMedicationsProps } from "./patient-medications";
import { PatientMedicationsOutsideProps } from "./patient-medications-outside";

export type PatientMedicationsProfileProps = Omit<
  ZusAggregatedProfileProps,
  "resources"
> &
  PatientMedicationsProps &
  PatientMedicationsOutsideProps;

export const PatientMedicationsProfile = (
  props: PatientMedicationsProfileProps
) => (
  <ZusAggregatedProfile
    hideTitle
    resources={["medications", "medications-outside"]}
    {...props}
    medicationsProps={props}
    medicationsOutsideProps={props}
  />
);
