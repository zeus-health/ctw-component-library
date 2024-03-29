import { DOMParser } from "@xmldom/xmldom";
import { useMemo, useRef, useState } from "react";
import xpath from "xpath";
import { CcdaViewer } from "./ccda_viewer";
import "./styles.scss";
import { DocumentButton } from "./document-button";

const xmlTypes = ["/xml", "/xhtml+xml", "application/xml", "text/xml"];

const isSpecificContentType = (extensions: string[], contentType: string) =>
  extensions.some((extension) => contentType.includes(extension));

interface BinaryFieldProps {
  data: string;
  contentType: string;
  fileName: string | undefined;
}

export const BinaryField = ({ data, contentType, fileName }: BinaryFieldProps) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [fileUrl, setFileUrl] = useState<string>();
  const [fileTitle, setFileTitle] = useState<string>();

  const ccdaDoc = useMemo(() => {
    if (!isSpecificContentType(xmlTypes, contentType)) return undefined;

    const xmlDocument = new DOMParser({
      locator: {},
      errorHandler: () => null,
    }).parseFromString(data, contentType);

    if (xpath.select1("//*[name()='patientRole']", xmlDocument)) {
      return xmlDocument;
    }

    return undefined;
  }, [contentType, data]);

  function downloadDocument() {
    // Clean up any previously created file.
    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
    }

    const objectURL = URL.createObjectURL(
      new Blob([data], {
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
