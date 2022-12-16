import { Grid, makeStyles, Switch } from "@material-ui/core";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { DOMParser } from "@xmldom/xmldom";
import { Buffer } from "buffer";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import ReactJson from "react-json-view";
import useIsomorphicLayoutEffect from "use-isomorphic-layout-effect";
import XmlBeautify from "xml-beautify";
import xpath from "xpath";
import { base64toBlob } from "./base64toBlob";
import { CcdaViewer } from "./ccda_viewer";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  base64BinaryText: {
    // width - sidebarWidth - marginLeft - marginRight - paddingLeft - paddingRight - additionalPixels
    width: "calc(100vw - 200px - 24px - 24px - 16px - 16px - 2px)",
    overflowWrap: "break-word",
  },
  pdfWrapper: {
    width: "calc(100vw - 200px - 24px - 24px - 16px - 16px - 2px)",
  },
  switchContainer: {
    display: "flex",
    alignItems: "center",
  },
  switchWrapper: {
    marginLeft: "32px",
    marginTop: "-36px",
    width: "fit-content",
  },
  switchLabel: {
    fontSize: "0.85rem",
  },
  xmlWrapper: {
    width: "calc(100vw - 200px - 24px - 24px - 16px - 16px - 2px)",
    border: "none",
    outline: "none",
    backgroundColor: "white",
    color: "black",
    resize: "none",
  },
}));

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
  const classes = useStyles();

  useIsomorphicLayoutEffect(() => {
    if (isSpecificContentType(xmlTypes, contentType)) {
      setTextAreaHeight(textArea.current?.scrollHeight || 5000);
    } // fallback value
  }, [data, contentType]);

  if (isSpecificContentType(xmlTypes, contentType)) {
    return (
      // textarea is needed to prettify xml
      <textarea
        className={classes.xmlWrapper}
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
        <div className={classes.pdfWrapper}>
          <Viewer fileUrl={url} />
        </div>
      </Worker>
    );
  }

  if (isSpecificContentType(["/fhir+json", "/json"], contentType)) {
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
  const classes = useStyles();

  useEffect(() => {
    if (!decoded) setParsedCCDA(false);
  }, [decoded]);

  const handleChange =
    (isParsedAction: boolean) =>
    (event: ChangeEvent<HTMLInputElement>): void =>
      (isParsedAction ? setParsedCCDA : setDecoded)(event.target.checked);

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
      event: handleChange(true),
      disabled: !decoded,
      display: Boolean(ccdaDoc),
    },
  ];
  const ccdaDocument = parsedCCDA ? ccdaDoc : undefined;

  const getContent = () => {
    if (ccdaDocument) return <CcdaViewer document={ccdaDocument} />;

    return <div className={classes.base64BinaryText}>{value}</div>;
  };
  return (
    <div className={classes.container}>
      <div className={classes.switchContainer}>
        {actions.map(
          (action) =>
            action.display && (
              <Grid
                key={action.label}
                component="label"
                container
                alignItems="center"
                className={classes.switchWrapper}
              >
                <Grid item>
                  <Switch
                    checked={action.value}
                    onChange={action.event}
                    disabled={action.disabled}
                  />
                </Grid>
                <Grid item className={classes.switchLabel}>
                  {action.label}
                </Grid>
              </Grid>
            )
        )}
      </div>
      {getContent()}
    </div>
  );
};
