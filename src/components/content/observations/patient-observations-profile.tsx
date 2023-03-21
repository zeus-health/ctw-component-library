import {
  ZusAggregatedProfile,
  ZusAggregatedProfileProps,
  ZusAggregatedProfileSubComponentProps,
} from "@/components/content/zus-aggregated-profile/zus-aggregated-profile";

export type PatientObservationsProfileProps = Omit<
  ZusAggregatedProfileProps,
  "resources"
> &
  Pick<
    ZusAggregatedProfileSubComponentProps,
    "observationsProps" | "observationsOutsideProps"
  >;

export const PatientObservationsProfile = (
  props: PatientObservationsProfileProps
) => (
  <ZusAggregatedProfile
    resources={["observations", "observations-outside"]}
    {...props}
  />
);
