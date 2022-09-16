import { z } from "zod";

export const conditionSchema = z.object({
  subjectID: z.string({
    required_error: "Condition subjectID must be specified.",
  }),
  recordedDate: z.date({
    required_error: "Condition recorded date must be specified.",
  }),
  display: z.string({ required_error: "Condition name must be specified." }),
  snomedCode: z.string({ required_error: "Snomed code must be provided." }),
  clinicalStatus: z.enum([
    "active",
    "recurrence",
    "relapse",
    "inactive",
    "remission",
    "resolved",
  ]),
  onset: z.date({ required_error: "Conditions's onset is required." }),
  abatement: z.date({ required_error: "Condition's abatement is required." }),
  verificationStatus: z.enum([
    "unconfirmed",
    "provisional",
    "differential",
    "confirmed",
    "refuted",
    "entered-in-error",
  ]),
  note: z.string().optional(),
});
