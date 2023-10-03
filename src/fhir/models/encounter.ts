import { Coding, Resource } from "fhir/r4";
import { DocumentModel } from "./document";
import { FHIRModel } from "./fhir-model";
import { PatientModel } from "./patient";
import { codeableConceptLabel } from "../codeable-concept";
import { formatDateISOToLocal } from "../formatters";
import { findReference } from "../resource-helper";
import { SYSTEM_ZUS_CREATED_AT } from "../system-urls";
import { ResourceMap } from "../types";
import {
  isEmptyClinicalNote,
  isSectionDocument,
} from "@/components/content/document/helpers/filters";
import { isNullFlavorSystem } from "@/fhir/mappings/null-flavor";
import { compact, flatten, uniq } from "@/utils/nodash";

export class EncounterModel extends FHIRModel<fhir4.Encounter> {
  kind = "Encounter" as const;

  public binaryId?: string;

  public clinicalNotes: DocumentModel[];

  private provenance: fhir4.Provenance[];

  public relatedEncounter: EncounterModel | undefined;

  constructor(
    resource: fhir4.Encounter,
    provenance: fhir4.Provenance[],
    includedResources?: ResourceMap,
    revIncludes?: Resource[]
  ) {
    super(resource, includedResources, revIncludes);
    this.clinicalNotes = [];
    this.provenance = provenance;
  }

  set documents(documents: DocumentModel[]) {
    const binaryID = getBinaryIDFromProvenance(this.provenance);
    if (binaryID) {
      this.clinicalNotes = documents.filter(
        (d) => d.binaryId === binaryID && isSectionDocument(d) && !isEmptyClinicalNote(d)
      );
    }
  }

  get lastUpdated(): string | undefined {
    return (
      this.resource.meta?.lastUpdated ||
      this.resource.meta?.extension?.find((e) => e.url === SYSTEM_ZUS_CREATED_AT)?.valueDateTime
    );
  }

  get patient(): PatientModel | undefined {
    const patient = findReference("Patient", undefined, undefined, this.resource.subject);
    return patient ? new PatientModel(patient) : undefined;
  }

  get class(): string | undefined {
    const { display, code } = this.resource.class;
    return display ?? code !== "UNK" ? code : undefined;
  }

  get diagnoses(): string[] | undefined {
    return compact(uniq(this.resource.diagnosis?.map((d) => d.condition.display)));
  }

  get dischargeDisposition(): string | undefined {
    return codeableConceptLabel(this.resource.hospitalization?.dischargeDisposition);
  }

  get location(): string | undefined {
    const locations = compact(this.resource.location?.map((l) => l.location.display));
    return locations.length ? locations.join(", ") : undefined;
  }

  get participantsDisplay(): string | undefined {
    return this.participants?.join(", ");
  }

  get participants(): string[] | undefined {
    return compact(uniq(this.resource.participant?.map((p) => p.individual?.display)));
  }

  get periodEnd() {
    return formatDateISOToLocal(this.resource.period?.end);
  }

  get periodStart() {
    return formatDateISOToLocal(this.resource.period?.start);
  }

  get dateDisplay() {
    if (this.periodStart !== this.periodEnd && this.periodEnd) {
      return `${this.periodStart} - ${this.periodEnd}`;
    }
    return this.periodStart;
  }

  get reason(): string | undefined {
    const reasons = compact(this.resource.reasonCode?.map((d) => codeableConceptLabel(d)));

    return reasons.length ? reasons.join(", ") : undefined;
  }

  get status() {
    return this.resource.status;
  }

  get typeCodings(): Coding[] {
    return compact(flatten(this.resource.type?.map((t) => t.coding)));
  }

  get typeSpecialty() {
    const locations = compact(
      this.resource.location?.map((l) => {
        const location = findReference("Location", undefined, undefined, l.location);
        return location?.type?.map((t) => codeableConceptLabel(t));
      })
    );
    const uniqueLocations = uniq(flatten(locations)).filter(
      (l) => l !== "Not Indicated" && l !== "Unknown" && l !== "NoInformation"
    );

    return uniqueLocations.length ? uniqueLocations.join(", ") : undefined;
  }

  get typeDisplay(): string | undefined {
    const { display: classDisplay, system: classSystem } = this.resource.class;
    const classCode = (this.resource.class.code ?? "").toUpperCase();
    const firstTypeCoding = this.resource.type?.[0]?.coding?.[0] ?? {};
    const { text: typeText } = this.resource.type?.[0] ?? {};
    const typeCode = (firstTypeCoding.code ?? "").toUpperCase();

    // Grab our code and display, first from class if valid, otherwise from
    // first type coding.
    const isNullFlavor = isNullFlavorSystem(classSystem);
    const code = isNullFlavor ? typeCode : classCode;
    let display = isNullFlavor ? typeText : classDisplay;

    // Optionally add expanded version of the code
    // if code is AMB, IMP, EMER and display isn't already the expanded version.
    const mappings: Record<string, string> = {
      AMB: "Ambulatory",
      IMP: "Inpatient",
      EMER: "Emergency",
    };
    if (code && Object.keys(mappings).includes(code)) {
      const codeDisplay = mappings[code];
      if (!display) {
        return codeDisplay;
      }

      if (display.toLowerCase() !== codeDisplay.toLowerCase()) {
        display += `, ${mappings[code]}`;
      }
    }

    return display ?? "Unknown";
  }
}

export function getBinaryIDFromProvenance(provenance: fhir4.Provenance[]) {
  if (provenance.length > 0) {
    let binaryIDReference = "";
    for (let i = 0; i < provenance.length; i += 1) {
      const entity = provenance[i].entity?.find((e) => {
        if (e.what.reference !== undefined) {
          return true;
        }
        return false;
      });
      if (entity && entity.what.reference) {
        binaryIDReference = entity.what.reference;
        break;
      }
    }
    if (binaryIDReference) {
      return binaryIDReference.split("/")[1];
    }
  }
  return undefined;
}
