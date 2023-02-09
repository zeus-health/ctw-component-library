import { gql } from "graphql-request";
import { createGraphClient } from "./fqs";
import { AllergyModel } from "./models/allergies";
import { searchCommonRecords } from "./search-helpers";
import { applyAllergyFilters } from "@/components/content/allergies/allergies-filter";
import { useQueryWithPatient } from "@/components/core/providers/patient-provider";
import { QUERY_KEY_PATIENT_ALLERGIES } from "@/utils/query-keys";

export function usePatientAllergies() {
  return useQueryWithPatient(
    QUERY_KEY_PATIENT_ALLERGIES,
    [],
    async (requestContext, patient) => {
      try {
        const graphClient = createGraphClient(requestContext);
        const data = await graphClient.request(getAllergiesQuery(patient.UPID));

        const { bundle, resources } = await searchCommonRecords(
          "AllergyIntolerance",
          requestContext,
          {
            patientUPID: patient.UPID,
          }
        );

        console.log("resources", resources);
        console.log("data", data.AllergyIntoleranceList);
        console.log(
          "  data.map((allergy) => new AllergyModel(allergy))",
          data.AllergyIntoleranceList.map(
            (allergy) => new AllergyModel(allergy)
          )
        );
        // return resources;
        // return data.AllergyIntoleranceList;

        return data.AllergyIntoleranceList.map(
          (allergy) => new AllergyModel(allergy)
        );

        return applyAllergyFilters(data.AllergyIntoleranceLis);

        // return orderBy(
        //   applyAllergyFilters(data.AllergyIntoleranceLis),
        //   [(allergy) => allergy.onset],
        //   ["desc"]
        // );
      } catch (e) {
        console.log("e", e);
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
