import { isEmpty } from "lodash";
import { DocumentOnlyProps } from "../../types";
import { Table } from "../Table/Table";
import { getAuthenticatorData } from "./data";

export const Authenticator = ({
  document,
}: DocumentOnlyProps): JSX.Element | null => {
  const authenticators = getAuthenticatorData(document);

  if (!authenticators || isEmpty(authenticators)) return null;

  const finalData = authenticators.flatMap((authenticator) => [
    {
      label: "Authenticator",
      value: `${authenticator.name || "Unknown"}${
        authenticator.time ? ` signed at ${authenticator.time}` : ""
      }`,
    },
    {
      label: "Contact Details",
      value: authenticator.contactDetails,
    },
  ]);

  return <Table data={finalData} />;
};
