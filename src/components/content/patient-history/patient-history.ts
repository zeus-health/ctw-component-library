import { getZusApiBaseUrl } from "@/api/urls";
import { CTWRequestContext } from "@/components/core/ctw-context";
import { errorResponse } from "@/utils/errors";
import {
  PatientRefreshHistoryMessage,
  RawPatientRefreshHistoryMessage,
} from "./patient-history-types";

export async function getPatientRefreshHistoryMessages(
  requestContext: CTWRequestContext,
  patientID: string
) {
  const endpointUrl = `${getZusApiBaseUrl(
    requestContext.env
  )}/patient-history/messages?patient_id=${patientID}`;

  try {
    const response = await fetch(endpointUrl, {
      headers: {
        Authorization: `Bearer ${requestContext.authToken}`,
        "practitioner-npi": "1245319599",
        "practitioner-role": "Test Provider",
      },
    });
    const result = await response.json();
    console.log("result", result);
    return (
      Object.values(result.data) as RawPatientRefreshHistoryMessage[]
    ).map((entry: RawPatientRefreshHistoryMessage) => ({
      status: entry.status,
      messageUuid: entry.messageUuid,
      initialData: entry.initialData,
      createdAt: entry._createdAt,
      updatedAt: entry._updatedAt,
    })) as PatientRefreshHistoryMessage[];
  } catch (err) {
    throw errorResponse(
      "Failed fetching patient refresh history messages",
      err
    );
  }
}

export function getLatestPatientRefreshHistoryMessage(
  requestContext: CTWRequestContext,
  patientID: string,
  statuses: string[]
) {
  // const messages = await getPatientRefreshHistoryMessages(
  //   requestContext,
  //   patientID
  // );
  // if (messages.length === 0) {
  //   return null;
  // }

  // return messages.reduce((previous, current) =>
  //   parseISO(current.updatedAt) > parseISO(previous.updatedAt) &&
  //   statuses.includes(current.status)
  //     ? current
  //     : previous
  // );

  const result = {
    data: [
      // {
      //   status: "done",
      //   messageUuid: "6e870ca7-90d4-4afe-bbe0-ed3366cb312e",
      //   initialData: {
      //     patientId: "571bf23d-0eff-48fe-8231-db41d0b77fa6",
      //   },
      //   _documentMessagesIds: [
      //     "6e870ca7-90d4-4afe-bbe0-ed3366cb312e-doc-0",
      //     "6e870ca7-90d4-4afe-bbe0-ed3366cb312e-doc-1",
      //     "6e870ca7-90d4-4afe-bbe0-ed3366cb312e-doc-2",
      //     "6e870ca7-90d4-4afe-bbe0-ed3366cb312e-doc-3",
      //     "6e870ca7-90d4-4afe-bbe0-ed3366cb312e-doc-4",
      //     "6e870ca7-90d4-4afe-bbe0-ed3366cb312e-doc-5",
      //     "6e870ca7-90d4-4afe-bbe0-ed3366cb312e-doc-6",
      //     "6e870ca7-90d4-4afe-bbe0-ed3366cb312e-doc-7",
      //     "6e870ca7-90d4-4afe-bbe0-ed3366cb312e-doc-8",
      //     "6e870ca7-90d4-4afe-bbe0-ed3366cb312e-doc-9",
      //     "6e870ca7-90d4-4afe-bbe0-ed3366cb312e-doc-10",
      //     "6e870ca7-90d4-4afe-bbe0-ed3366cb312e-doc-11",
      //     "6e870ca7-90d4-4afe-bbe0-ed3366cb312e-doc-12",
      //     "6e870ca7-90d4-4afe-bbe0-ed3366cb312e-doc-13",
      //     "6e870ca7-90d4-4afe-bbe0-ed3366cb312e-doc-14",
      //     "6e870ca7-90d4-4afe-bbe0-ed3366cb312e-doc-15",
      //     "6e870ca7-90d4-4afe-bbe0-ed3366cb312e-doc-16",
      //     "6e870ca7-90d4-4afe-bbe0-ed3366cb312e-doc-17",
      //   ],
      //   _errors: [],
      //   _createdAt: "2022-08-22T12:03:52.921Z",
      //   _updatedAt: "2022-08-22T12:17:50.172Z",
      // },
      {
        status: "error",
        messageUuid: "e9b9f2cf-4aec-4a9d-a314-4b88c10db534",
        initialData: {
          patientId: "571bf23d-0eff-48fe-8231-db41d0b77fa6",
        },
        _documentMessagesIds: [],
        _errors: [
          {
            error_code: 500,
            error_title: "CommonWellDocumentNotFound",
            error_details: "Unknown error occurred",
          },
        ],
        _createdAt: "2022-09-30T13:08:21.013Z",
        _updatedAt: "2022-09-30T13:15:43.495Z",
      },
      {
        status: "done",
        messageUuid: "d546d2be-d858-479b-8e35-8f46ef93c522",
        initialData: {
          patientId: "571bf23d-0eff-48fe-8231-db41d0b77fa6",
        },
        _documentMessagesIds: [
          "d546d2be-d858-479b-8e35-8f46ef93c522-doc-0",
          "d546d2be-d858-479b-8e35-8f46ef93c522-doc-1",
          "d546d2be-d858-479b-8e35-8f46ef93c522-doc-2",
          "d546d2be-d858-479b-8e35-8f46ef93c522-doc-3",
          "d546d2be-d858-479b-8e35-8f46ef93c522-doc-4",
          "d546d2be-d858-479b-8e35-8f46ef93c522-doc-5",
          "d546d2be-d858-479b-8e35-8f46ef93c522-doc-6",
          "d546d2be-d858-479b-8e35-8f46ef93c522-doc-7",
          "d546d2be-d858-479b-8e35-8f46ef93c522-doc-8",
          "d546d2be-d858-479b-8e35-8f46ef93c522-doc-9",
          "d546d2be-d858-479b-8e35-8f46ef93c522-doc-10",
          "d546d2be-d858-479b-8e35-8f46ef93c522-doc-11",
          "d546d2be-d858-479b-8e35-8f46ef93c522-doc-12",
          "d546d2be-d858-479b-8e35-8f46ef93c522-doc-13",
          "d546d2be-d858-479b-8e35-8f46ef93c522-doc-14",
          "d546d2be-d858-479b-8e35-8f46ef93c522-doc-15",
          "d546d2be-d858-479b-8e35-8f46ef93c522-doc-16",
          "d546d2be-d858-479b-8e35-8f46ef93c522-doc-17",
          "d546d2be-d858-479b-8e35-8f46ef93c522-doc-18",
          "d546d2be-d858-479b-8e35-8f46ef93c522-doc-19",
          "d546d2be-d858-479b-8e35-8f46ef93c522-doc-20",
          "d546d2be-d858-479b-8e35-8f46ef93c522-doc-21",
          "d546d2be-d858-479b-8e35-8f46ef93c522-doc-22",
          "d546d2be-d858-479b-8e35-8f46ef93c522-doc-23",
          "d546d2be-d858-479b-8e35-8f46ef93c522-doc-24",
          "d546d2be-d858-479b-8e35-8f46ef93c522-doc-25",
          "d546d2be-d858-479b-8e35-8f46ef93c522-doc-26",
          "d546d2be-d858-479b-8e35-8f46ef93c522-doc-27",
          "d546d2be-d858-479b-8e35-8f46ef93c522-doc-28",
          "d546d2be-d858-479b-8e35-8f46ef93c522-doc-29",
          "d546d2be-d858-479b-8e35-8f46ef93c522-doc-30",
          "d546d2be-d858-479b-8e35-8f46ef93c522-doc-31",
          "d546d2be-d858-479b-8e35-8f46ef93c522-doc-32",
          "d546d2be-d858-479b-8e35-8f46ef93c522-doc-33",
          "d546d2be-d858-479b-8e35-8f46ef93c522-doc-34",
          "d546d2be-d858-479b-8e35-8f46ef93c522-doc-35",
          "d546d2be-d858-479b-8e35-8f46ef93c522-doc-36",
          "d546d2be-d858-479b-8e35-8f46ef93c522-doc-37",
          "d546d2be-d858-479b-8e35-8f46ef93c522-doc-38",
          "d546d2be-d858-479b-8e35-8f46ef93c522-doc-39",
          "d546d2be-d858-479b-8e35-8f46ef93c522-doc-40",
          "d546d2be-d858-479b-8e35-8f46ef93c522-doc-41",
          "d546d2be-d858-479b-8e35-8f46ef93c522-doc-42",
          "d546d2be-d858-479b-8e35-8f46ef93c522-doc-43",
          "d546d2be-d858-479b-8e35-8f46ef93c522-doc-44",
          "d546d2be-d858-479b-8e35-8f46ef93c522-doc-45",
          "d546d2be-d858-479b-8e35-8f46ef93c522-doc-46",
        ],
        _errors: [],
        _createdAt: "2022-07-14T12:16:09.877Z",
        _updatedAt: "2022-07-14T12:28:04.855Z",
      },
      {
        status: "error",
        messageUuid: "bff96fab-ac1e-4b06-a026-d3d36abf3d1e",
        initialData: {
          patientId: "571bf23d-0eff-48fe-8231-db41d0b77fa6",
        },
        _documentMessagesIds: [],
        _errors: [
          {
            error_code: 500,
            error_title: "CommonWellDocumentNotFound",
            error_details: "Unknown error occurred",
          },
        ],
        _createdAt: "2022-08-09T11:34:29.424Z",
        _updatedAt: "2022-08-09T11:40:30.885Z",
      },
    ],
  };
  return result;
}
