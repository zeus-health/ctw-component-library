import xpath from "xpath";
import { formatDate, getHumanName, getPeriod } from "../../../helpers";
import { LabelValueType } from "../../../types";
import { isEmpty } from "@/utils/nodash";

export const getDocumentationOf = (
  document: Document
): Record<string, LabelValueType[]> | undefined => {
  const serviceEvents = xpath.select(
    "//*[name()='documentationOf']/*[name()='serviceEvent']",
    document
  ) as Document[];

  if (isEmpty(serviceEvents)) return undefined;

  const result = serviceEvents.map((serviceEvent) => {
    const effectiveTime = xpath.select1(
      "*[name()='effectiveTime']",
      serviceEvent
    ) as Document;

    const period = getPeriod(effectiveTime);

    const performerNames = xpath.select(
      "*[name()='performer']/*[name()='assignedEntity']/*[name()='assignedPerson']/*[name()='name']",
      serviceEvent
    ) as Document[];

    const performers = performerNames.map((performer) =>
      getHumanName(performer)
    );

    return [
      {
        label: "Date/Time:",
        value:
          period.start || period.end
            ? `from ${formatDate(period.start) || "unknown"} to ${
                formatDate(period.end) || "unknown"
              }`
            : "",
      },
      ...performers.map((performer) => ({
        label: "Performer:",
        value: performer,
      })),
    ];
  });

  return result.reduce(
    (acc, val, index) => ({ ...acc, [`documentationOf${index + 1}`]: val }),
    {}
  );
};
