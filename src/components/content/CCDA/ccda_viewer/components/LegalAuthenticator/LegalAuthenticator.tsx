import { DocumentOnlyProps } from "../../types";
import { Table } from "../Table/Table";
import { getLegalAuthenticatorData } from "./data";

export const LegalAuthenticator = ({ document }: DocumentOnlyProps) => {
  const legalAuthenticator = getLegalAuthenticatorData(document);

  if (!legalAuthenticator) return null;

  const { name, time, contactDetails } = legalAuthenticator;

  const withSignedAt = time ? ` signed at ${time}` : "";
  const finalData = [
    {
      label: "Legal Authenticator",
      value: `${name}${withSignedAt}`,
    },
    { label: "Contact Details", value: contactDetails },
  ];

  return <Table data={finalData} />;
};
