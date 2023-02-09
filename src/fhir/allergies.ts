import { gql } from "graphql-request";
import { createGraphClient } from "./fqs";
import { applyAllergyFilters } from "@/components/content/allergies/allergies-filter";
import { useQueryWithPatient } from "@/components/core/providers/patient-provider";
import { orderBy } from "@/utils/nodash";
import { QUERY_KEY_PATIENT_ALLERGIES } from "@/utils/query-keys";

export function usePatientAllergies() {
  return useQueryWithPatient(
    QUERY_KEY_PATIENT_ALLERGIES,
    [],
    async (requestContext, patient) => {
      try {
        const graphClient = createGraphClient(requestContext);
        const data = await graphClient.request(getAllergiesQuery(patient.UPID));

        return orderBy(
          applyAllergyFilters(data.AllergyIntoleranceList),
          [(allergy) => allergy.onset],
          ["desc"]
        );
      } catch (e) {
        throw new Error(
          `Failed fetching allergies information for patient ${patient.UPID}`
        );
      }
    }
  );
}

const getAllergiesQuery = (upid: string) => gql`
  {
    AllergyIntoleranceList(upid: "${upid}") {
      id
      meta {
        tag {
          system
          code
        }
      }
      identifier {
        id
        system
        use
        type {
          coding {
            code
            display
            system
          }
        }
        period {
          start
          end
        }
        value
      }
      type
      clinicalStatus {
        coding {
          code
          display
          system
        }
      }
      code {
        coding {
          code
          display
          system
        }
      }
      category
      onsetAge {
        value
        unit
      }
      onsetRange {
        low {
          value
        }
        high {
          value
        }
      }
      onsetPeriod {
        start
        end
      }
      onsetString
      onsetDateTime
      reaction {
        id
        manifestation {
          coding {
            code
            display
            system
          }
        }
      }
    }
  }
`;
