import React, { ReactNode } from "react";
import { CTWProvider, Env } from "@/components/core/ctw-provider";
import { PatientProvider } from "@/components/core/patient-provider";

export type MockCtwContextProps = {
  env?: Env;
  builderId?: string;
  patientId?: string;
  systemUrl?: string;
  children: ReactNode;
};

export const MockCtwContext = (props: MockCtwContextProps) => {
  const {
    builderId = "12345",
    patientId = "007",
    systemUrl = "https://zusapi.com/fhir/identifier/universal-id",
    env = "dev",
    children,
  } = props;

  return (
    <CTWProvider env={env} authToken="12345" builderId={builderId}>
      <PatientProvider patientID={patientId} systemURL={systemUrl}>
        {children}
      </PatientProvider>
    </CTWProvider>
  );
};

MockCtwContext.mockedUser = {
  resourceType: "Bundle",
  id: "c1db2d18-e0f2-420e-88d8-c0e32676e894",
  meta: {
    lastUpdated: "2022-11-14T18:57:45.140+00:00",
  },
  type: "searchset",
  link: [
    {
      relation: "self",
      url: "https://api.sandbox.zusapi.com/fhir/Patient?_count=1&_include=Patient%3Aorganization&_tag=https%3A%2F%2Fzusapi.com%2Faccesscontrol%2Fowner%7C&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Fthirdparty%2Fsource%7Csurescripts&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Fthirdparty%2Fsource%7Ccommonwell&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Fthirdparty%2Fsource%7Celation&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Flens%7CActiveMedications&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Flens%7CChronicConditions&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Fsummary%7CCommon&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Ffhir%2Ftag%2Fupi-record-type%7Cuniversal&identifier=https%3A%2F%2Fzusapi.com%2Ffhir%2Fidentifier%2Funiversal-id%7C007",
    },
    {
      relation: "next",
      url: "https://api.sandbox.zusapi.com/fhir/Patient?_count=1&_include=Patient%3Aorganization&_offset=1&_tag=https%3A%2F%2Fzusapi.com%2Faccesscontrol%2Fowner%7C&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Fthirdparty%2Fsource%7Csurescripts&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Fthirdparty%2Fsource%7Ccommonwell&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Fthirdparty%2Fsource%7Celation&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Flens%7CActiveMedications&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Flens%7CChronicConditions&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Fsummary%7CCommon&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Ffhir%2Ftag%2Fupi-record-type%7Cuniversal&identifier=https%3A%2F%2Fzusapi.com%2Ffhir%2Fidentifier%2Funiversal-id%7C007",
    },
  ],
  entry: [
    {
      fullUrl:
        "https://api.sandbox.zusapi.com/fhir/Patient/4ac4b4c6-cbed-4d52-b37d-be8dc785ef9a",
      resource: {
        resourceType: "Patient",
        id: "4ac4b4c6-cbed-4d52-b37d-be8dc785ef9a",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-11-08T15:02:14.762+00:00",
            },
          ],
          versionId: "2",
          lastUpdated: "2022-11-08T15:02:15.233+00:00",
          source: "#829e9998c8d6fa1a",
          security: [
            {
              system: "http://terminology.hl7.org/CodeSystem/v3-ActReason",
              code: "HTEST",
            },
          ],
          tag: [
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/009204f2-5e4c-48da-99cc-6d5f6a99282d",
              display: "Canvas Medical - Test Customer",
            },
          ],
        },
        identifier: [
          {
            system: "https://canvasmedical.com/patient-id",
            value: "12345",
          },
          {
            system: "https://zusapi.com/fhir/identifier/universal-id",
            value: "007",
          },
        ],
        name: [
          {
            family: "Shah",
            given: ["Akhil"],
          },
        ],
        telecom: [
          {
            system: "email",
            value: "akhil.shah@example.com",
          },
          {
            system: "phone",
            value: "555-739-0835",
            use: "home",
          },
          {
            system: "phone",
            value: "555-737-8967",
            use: "mobile",
          },
        ],
        gender: "male",
        birthDate: "2010-08-16",
        address: [
          {
            line: ["83 SHADOW LN"],
            city: "LAS VEGAS",
            state: "NV",
            postalCode: "89106-4119",
          },
        ],
        maritalStatus: {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/v3-MaritalStatus",
              code: "S",
              display: "Single",
            },
          ],
          text: "Single",
        },
        contact: [
          {
            relationship: [
              {
                coding: [
                  {
                    system: "http://terminology.hl7.org/CodeSystem/v2-0131",
                    code: "C",
                    display: "Emergency contact",
                  },
                ],
                text: "Emergency contact",
              },
            ],
            name: {
              family: "Shah",
              given: ["Sonah"],
            },
            telecom: [
              {
                system: "phone",
                value: "555-843-3900",
                use: "home",
              },
              {
                system: "email",
                value: "sonal.shah@example.com",
              },
            ],
          },
        ],
      },
      search: {
        mode: "match",
      },
    },
  ],
};
