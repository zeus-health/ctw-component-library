import { applyDocumentFilters, THIRD_PARTY_SOURCE_SYSTEM, ZUS_CREATION_DATE_URL } from "./filters";
import { DocumentModel } from "@/fhir/models/document";

interface SyntheticDocRefProps {
  id: string;
  postRainbowCategories: boolean;
  zusCreationDate: string;
  thirdPartyOwner?: string;
  docRefDate?: string;
  binaryCreationDate?: string;
}

const createSyntheticDocRef = (props: SyntheticDocRefProps): fhir4.DocumentReference => ({
  id: props.id,
  resourceType: "DocumentReference",
  status: "current",
  content: [
    {
      attachment: {
        creation: props.binaryCreationDate,
        data: "blah",
      },
    },
  ],
  date: props.docRefDate,
  meta: {
    extension: [
      {
        url: ZUS_CREATION_DATE_URL,
        valueInstant: props.zusCreationDate,
      },
    ],
    tag: props.thirdPartyOwner
      ? [
          {
            system: THIRD_PARTY_SOURCE_SYSTEM,
            code: props.thirdPartyOwner,
          },
        ]
      : undefined,
  },
  category: props.postRainbowCategories
    ? [
        {
          coding: [
            {
              code: "abc",
            },
          ],
          text: "abc",
        },
        {
          coding: [
            {
              code: "xyz",
            },
          ],
          text: "xyz",
        },
      ]
    : undefined,
});

describe("document filters tests", () => {
  const commonwellDoc = createSyntheticDocRef({
    id: "1",
    docRefDate: "2023-04-17T12:34:56.000Z",
    zusCreationDate: "2023-04-17T12:34:56.000Z",
    thirdPartyOwner: "commonwell",
    postRainbowCategories: true,
  });

  const commonwelPreRainbowDoc = createSyntheticDocRef({
    id: "1a",
    docRefDate: "2022-04-17T12:34:56.000Z",
    zusCreationDate: "2022-04-17T12:34:56.000Z",
    thirdPartyOwner: "commonwell",
    postRainbowCategories: false,
  });

  const surescriptsDoc = createSyntheticDocRef({
    id: "2",
    docRefDate: "2023-04-17T12:34:56.000Z",
    zusCreationDate: "2023-04-17T12:34:56.000Z",

    thirdPartyOwner: "surescripts",
    postRainbowCategories: true,
  });

  const questDoc = createSyntheticDocRef({
    id: "3",
    docRefDate: "2023-04-17T12:34:56.000Z",
    zusCreationDate: "2023-04-17T12:34:56.000Z",

    thirdPartyOwner: "quest",
    postRainbowCategories: true,
  });

  const firstPartyDoc = createSyntheticDocRef({
    id: "4",
    docRefDate: "2023-04-17T12:34:56.000Z",
    zusCreationDate: "2023-04-17T12:34:56.000Z",
    postRainbowCategories: false,
  });

  test("verify only commonwell docs are rendered", () => {
    const input = [commonwellDoc, commonwelPreRainbowDoc, surescriptsDoc, questDoc, firstPartyDoc];
    const expectedOutput = [commonwellDoc, commonwelPreRainbowDoc].map(
      (docRef) => new DocumentModel(docRef)
    );
    const actualOutput = applyDocumentFilters(input);

    expect(actualOutput).toStrictEqual(expectedOutput);
  });
});
