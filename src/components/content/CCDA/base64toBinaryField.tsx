import { DOMParser } from "@xmldom/xmldom";
import { Buffer } from "buffer";
import { ChangeEvent, useMemo, useState } from "react";
import xpath from "xpath";
import { CcdaViewer } from "./ccda_viewer";
import "./styles.scss";
import { Toggle } from "@/components/core/toggle";

const xmlTypes = ["/xml", "/xhtml+xml", "application/xml"];

const isSpecificContentType = (extensions: string[], contentType: string) =>
  extensions.some((extension) => contentType.includes(extension));

interface Base64BinaryFieldProps {
  value: string;
  contentType: string;
}

export const Base64BinaryField = ({
  value,
  contentType,
}: Base64BinaryFieldProps) => {
  const decoded = true;
  const [parsedCCDA, setParsedCCDA] = useState(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void =>
    setParsedCCDA(event.target.checked);

  const ccdaDoc = useMemo(() => {
    if (!isSpecificContentType(xmlTypes, contentType)) return undefined;

    const xmlDocument = new DOMParser({
      locator: {},
      errorHandler: (_) => null,
    }).parseFromString(
      Buffer.from(value, "base64").toString("utf8"),
      contentType
    );

    if (xpath.select1("//*[name()='patientRole']", xmlDocument)) {
      return xmlDocument;
    }

    return undefined;
  }, [contentType, value]);

  const actions = [
    {
      label: "Parsed",
      value: parsedCCDA,
      event: handleChange,
      disabled: !decoded,
      display: Boolean(ccdaDoc),
    },
  ];
  const ccdaDocument = parsedCCDA ? ccdaDoc : undefined;

  const getContent = () => {
    if (ccdaDocument) return <CcdaViewer document={ccdaDocument} />;

    return <div className="ctw-ccda-base64-binary-text">{value}</div>;
  };
  return (
    <div className="ctw-ccda-container">
      <div className="ctw-ccda-switch-container">
        {actions.map(
          (action) =>
            action.display && (
              <div key={action.label} className="ctw-cda-switch-wrapper">
                <span className="ctw-flex">
                  <Toggle
                    inputProps={{
                      value: action.label,
                      checked: action.value,
                      disabled: action.disabled,
                    }}
                    name={action.label}
                    text={action.label}
                    onChange={action.event}
                  />
                </span>
              </div>
            )
        )}
      </div>
      {getContent()}
    </div>
  );
};
