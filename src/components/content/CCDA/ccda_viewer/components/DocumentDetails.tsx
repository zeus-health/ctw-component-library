import { Authenticator } from "./Authenticator/Authenticator";
import { Author } from "./Author/Author";
import { Authorization } from "./Authorization/Authorization";
import { Custodian } from "./Custodian/Custodian";
import { DataEnterer } from "./DataEnterer/DataEnterer";
import { Document } from "./Document/Document";
import { DocumentationOf } from "./DocumentationOf/DocumentationOf";
import { Encounter } from "./Encounter/Encounter";
import { Informant } from "./Informant/Informant";
import { InformationRecipient } from "./InformationRecipient/InformationRecipient";
import { InFulfillmentOf } from "./InFulfillmentOf/InFulfillmentOf";
import { LegalAuthenticator } from "./LegalAuthenticator/LegalAuthenticator";
import { Participant } from "./Participant/Participant";
import { Patient } from "./Patient/Patient";
import { DocumentOnlyProps } from "../types";
import "../../styles.scss";

export const DocumentDetails = ({ document }: DocumentOnlyProps) => (
  <div className="ctw-ccda-document-details">
    <Document document={document} />
    <Custodian document={document} />
    <Patient document={document} />
    <Author document={document} />
    <DataEnterer document={document} />
    <Informant document={document} />
    <InformationRecipient document={document} />
    <LegalAuthenticator document={document} />
    <Authenticator document={document} />
    <Participant document={document} />
    <DocumentationOf document={document} />
    <InFulfillmentOf document={document} />
    <Authorization document={document} />
    <Encounter document={document} />
  </div>
);
