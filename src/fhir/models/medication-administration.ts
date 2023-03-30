import { FHIRModel } from "./fhir-model";
import { formatDateISOToLocal } from "@/fhir/formatters";
import { compact } from "@/utils/nodash/fp";

export class MedicationAdministrationModel extends FHIRModel<fhir4.MedicationAdministration> {
  kind = "MedicationAdministration" as const;

  get dosageDisplay(): string {
    const { text, route, dose } = this.resource.dosage || {};
    if (text) {
      return text;
    }

    return compact([dose?.value, dose?.unit]).join(" ");
  }

  get dosageRoute(): string | undefined {
    const { route } = this.resource.dosage || {};
    return route?.text;
  }

  get effectivePeriod() {
    const { start, end } = this.resource.effectivePeriod || {};

    return {
      start: start ? formatDateISOToLocal(start) : "",
      end: end ? formatDateISOToLocal(end) : "",
    };
  }
}
