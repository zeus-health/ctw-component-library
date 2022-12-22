import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { DOMParser } from "@xmldom/xmldom";
import { Buffer } from "buffer";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import useIsomorphicLayoutEffect from "use-isomorphic-layout-effect";
import XmlBeautify from "xml-beautify";
import xpath from "xpath";
import { base64toBlob } from "./base64toBlob";
import { CcdaViewer } from "./ccda_viewer";
import "./styles.scss";
import { reactJSONViewer } from "./reactViewer";
import { Toggle } from "@/components/core/toggle";

const xmlTypes = ["/xml", "/xhtml+xml", "application/xml"];

const isSpecificContentType = (extensions: string[], contentType: string) =>
  extensions.some((extension) => contentType.includes(extension));

interface FileProps {
  contentType: string;
  data: string;
}
const File = ({ contentType, data }: FileProps) => {
  const [textAreaHeight, setTextAreaHeight] = useState<number>(0);
  const textArea = useRef<HTMLTextAreaElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (isSpecificContentType(xmlTypes, contentType)) {
      setTextAreaHeight(textArea.current?.scrollHeight || 5000);
    } // fallback value
  }, [data, contentType]);

  if (isSpecificContentType(xmlTypes, contentType)) {
    return (
      // textarea is needed to prettify xml
      <textarea
        className="ctw-ccda-xml-wrapper"
        disabled
        ref={textArea}
        style={{ height: `${textAreaHeight}px` }}
        defaultValue={new XmlBeautify().beautify(
          Buffer.from(data, "base64").toString("utf8"),
          {
            indent: "  ",
            useSelfClosingElement: true,
          }
        )}
      />
    );
  }

  if (contentType.includes("/pdf")) {
    const blob = base64toBlob(data);
    const url = URL.createObjectURL(blob);
    return (
      // https://react-pdf-viewer.dev/docs/basic-usage/
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js">
        <div className="ctw-ccda-pdf-wrapper">
          <Viewer fileUrl={url} />
        </div>
      </Worker>
    );
  }

  if (isSpecificContentType(["/fhir+json", "/json"], contentType)) {
    const ReactJson = reactJSONViewer();
    return (
      <ReactJson
        src={JSON.parse(Buffer.from(data, "base64").toString("utf8"))}
        style={{ margin: 30, width: "50vw" }}
        // @ts-ignore https://github.com/mac-s-g/react-json-view/pull/348
        displayArrayKey={false}
        displayDataTypes={false}
        displayObjectSize={false}
        enableClipboard={false}
        iconStyle="square"
        name={false}
      />
    );
  }
  if (isSpecificContentType(["/jpg", "/png", "/jpeg"], contentType)) {
    return (
      <img src={`data:${contentType};base64,${data}`} alt="Img from base64" />
    );
  }

  return <span>{Buffer.from(data, "base64").toString("utf8")}</span>;
};

interface Base64BinaryFieldProps {
  value: string;
  record: fhir4.Binary;
  contentType: string;
}

export const Base64BinaryField = ({
  value,
  record,
  contentType,
}: Base64BinaryFieldProps) => {
  const [decoded, setDecoded] = useState(true);
  const [parsedCCDA, setParsedCCDA] = useState(true);

  useEffect(() => {
    if (!decoded) setParsedCCDA(false);
  }, [decoded]);

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
