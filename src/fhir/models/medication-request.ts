import { FHIRModel } from "./fhir-model";
import { findReference } from "@/fhir/resource-helper";
import { PractitionerModel } from "@/fhir/models/practitioner";
import { compact } from "lodash/fp";

export class MedicationRequestModel extends FHIRModel<fhir4.MedicationRequest> {
  get includedRequester() {
    const reference = this.resource.requester?.reference;

    const practitioner = findReference(
      "Practitioner",
      this.resource.contained,
      this.includedResources,
      reference
    );

    if (practitioner) {
      return new PractitionerModel(practitioner).fullName;
    }
    return this.resource.requester?.display;
  }

  get pharmacy() {
    const { reference, display } =
      this.resource.dispenseRequest?.performer || {};
    const organization = findReference(
      "Organization",
      this.resource.contained,
      this.includedResources,
      reference
    );
    if (organization) {
      const telecom = organization.telecom?.[0].value;
      const {
        city,
        state,
        postalCode,
        text,
        line = [],
      } = organization.address?.[0] || {};
      const cityStatePostal = compact([city, `${state} ${postalCode}`]).join(
        ", "
      );

      return {
        telecom,
        name: organization.name,
        address: text ?? compact([line, cityStatePostal]).join("\n"),
      };
    }
    return { name: display };
  }
}
