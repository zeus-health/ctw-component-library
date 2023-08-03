import { applyDocumentFilters, THIRD_PARTY_SOURCE_SYSTEM, ZUS_CREATION_DATE_URL } from "./filters";
import { DocumentModel } from "@/fhir/models/document";

interface SyntheticDocRefProps {
  id: string;
  title: string;
  postRainbowCategories: boolean;
  zusCreationDate?: string;
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
        title: props.title,
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
    title: "post rainbow commonwell",
    docRefDate: "2023-04-17T12:34:56.000Z",
    zusCreationDate: "2023-04-17T12:34:56.000Z",
    thirdPartyOwner: "commonwell",
    postRainbowCategories: true,
  });

  const commonwelPreRainbowDoc = createSyntheticDocRef({
    id: "1a",
    title: "pre rainbow commonwell",
    docRefDate: "2022-04-17T12:34:56.000Z",
    zusCreationDate: "2022-04-17T12:34:56.000Z",
    thirdPartyOwner: "commonwell",
    postRainbowCategories: false,
  });

  const commonwellNoDateDoc = createSyntheticDocRef({
    id: "2",
    title: "no odate commonwell",
    thirdPartyOwner: "commonwell",
    postRainbowCategories: false,
  });

  const surescriptsDoc = createSyntheticDocRef({
    id: "2",
    title: "post rainbow surescript",
    docRefDate: "2023-04-17T12:34:56.000Z",
    zusCreationDate: "2023-04-17T12:34:56.000Z",
    thirdPartyOwner: "surescripts",
    postRainbowCategories: true,
  });

  const questDoc = createSyntheticDocRef({
    id: "3",
    title: "post rainbow quest",
    docRefDate: "2023-04-17T12:34:56.000Z",
    zusCreationDate: "2023-04-17T12:34:56.000Z",
    thirdPartyOwner: "quest",
    postRainbowCategories: true,
  });

  const firstPartyDoc = createSyntheticDocRef({
    id: "4",
    title: "first party",
    docRefDate: "2023-04-17T12:34:56.000Z",
    zusCreationDate: "2023-04-17T12:34:56.000Z",
    postRainbowCategories: false,
  });

  const carequalityDoc = createSyntheticDocRef({
    id: "1",
    title: "post rainbow carequality",
    docRefDate: "2023-04-17T12:34:56.000Z",
    zusCreationDate: "2023-04-17T12:34:56.000Z",
    thirdPartyOwner: "carequality",
    postRainbowCategories: true,
  });

  test("verify only commonwell docs are rendered", () => {
    const input = [
      commonwellDoc,
      commonwelPreRainbowDoc,
      commonwellNoDateDoc,
      surescriptsDoc,
      questDoc,
      firstPartyDoc,
      carequalityDoc,
    ].map((i) => new DocumentModel(i));
    const expectedOutput = [
      commonwellDoc,
      commonwelPreRainbowDoc,
      commonwellNoDateDoc,
      carequalityDoc,
    ].map((docRef) => new DocumentModel(docRef));
    const actualOutput = applyDocumentFilters(input);

    expect(actualOutput).toStrictEqual(expectedOutput);
  });
});
