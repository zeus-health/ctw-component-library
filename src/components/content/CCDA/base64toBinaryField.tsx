import { DOMParser } from "@xmldom/xmldom";
import { Buffer } from "buffer";
import { useMemo, useRef, useState } from "react";
import xpath from "xpath";
import { CcdaViewer } from "./ccda_viewer";
import "./styles.scss";
import { DocumentButton } from "./document-button";

const xmlTypes = ["/xml", "/xhtml+xml", "application/xml"];

const isSpecificContentType = (extensions: string[], contentType: string) =>
  extensions.some((extension) => contentType.includes(extension));

interface Base64BinaryFieldProps {
  data: string;
  contentType: string;
  fileName: string | undefined;
}

export const Base64BinaryField = ({
  data,
  contentType,
  fileName,
}: Base64BinaryFieldProps) => {
  const ccdaDoc = useMemo(() => {
    if (!isSpecificContentType(xmlTypes, contentType)) return undefined;

    const xmlDocument = new DOMParser({
      locator: {},
      errorHandler: (_) => null,
    }).parseFromString(
      Buffer.from(data, "base64").toString("utf8"),
      contentType
    );

    if (xpath.select1("//*[name()='patientRole']", xmlDocument)) {
      return xmlDocument;
    }

    return undefined;
  }, [contentType, data]);

  const ref = useRef<HTMLAnchorElement>(null);
  const [fileUrl, setFileUrl] = useState<string>();
  const [fileTitle, setFileTitle] = useState<string>();
  // Clean up any previously created file.
  if (fileUrl) {
    URL.revokeObjectURL(fileUrl);
  }

  function downloadDocument() {
    const objectURL = URL.createObjectURL(
      new Blob([Buffer.from(data, "base64").toString("utf8")], {
        type: "text/xml",
      })
    );
    setFileUrl(objectURL);
    setFileTitle(`CCDA-${fileName}`);
    ref.current?.click();
  }

  return (
    <div className="ctw-ccda-container">
      <div className="ctw-ccda-switch-container">
        <a
          href={fileUrl}
          ref={ref}
          download={fileTitle}
          className="ctw-decoration-none ctw-flex ctw-w-fit"
        >
          <DocumentButton onClick={downloadDocument} text="Download XML" />
        </a>
      </div>
      {ccdaDoc ? (
        <CcdaViewer document={ccdaDoc} />
      ) : (
        <div className="ctw-ccda-base64-binary-text">{data}</div>
      )}
    </div>
  );
};
