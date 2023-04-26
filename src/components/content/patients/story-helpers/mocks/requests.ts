import { rest } from "msw";
import { createMockPatientBundle, createMockPatientBundleEntry } from "./patient-bundle";
import { chunk, toLower } from "@/utils/nodash/fp";

export function setupPatientsTableMocks(total: number) {
  const patients = Array.from({ length: total }).map(createMockPatientBundleEntry);

  return {
    parameters: {
      msw: {
        handlers: {
          mocks: [
            rest.get("https://api.dev.zusapi.com/fhir/Patient", (req, res, ctx) => {
              const params = req.url.searchParams;
              if (params.has("_count")) {
                const count = parseInt(params.get("_count") || "0", 10);
                const offset = parseInt(params.get("_offset") || "0", 10);
                const filteredPatients = patients.filter((patient) => {
                  const { given, family } = patient.resource?.name?.[0] || {};
                  return (
                    `${given?.[0] || ""} ${family || ""}`
                      .toLowerCase()
                      .indexOf(toLower(params.get("name") || "")) !== -1
                  );
                });

                const chunks = chunk(count, filteredPatients);
                const entries = chunks[Math.floor(offset / count)] || [];

                return res(
                  ctx.delay(2000),
                  ctx.status(200),
                  ctx.json(createMockPatientBundle(entries, count, offset, filteredPatients.length))
                );
              }

              return res(ctx.status(404));
            }),
          ],
        },
      },
    },
  };
}
