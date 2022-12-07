/* eslint-disable react/no-danger */ // silent linter for dangerouslySetInnerHTML because it is taken care of using dompurify
import { makeStyles } from "@material-ui/core";
import DOMPurify from "dompurify";
import { useState } from "react";
import { SectionType } from "../../types";
import { fixHtml } from "../../helpers";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  headerWrapper: {
    display: "flex",
    alignItems: "center",
  },
  arrow: {
    marginRight: "10px",
    cursor: "pointer",
    backgroundColor: "transparent",
    outline: "none",
    border: "none",
  },
  wrapper: {
    "& table": {
      width: "100%",
      "& > thead": {
        background: "#d3d3d3",
      },
      "& > tbody": {
        background: "#f2f2f2",
      },
      "& td": {
        padding: "0 5px",
      },
    },
  },
}));

export const Section = ({
  title,
  humanReadable,
}: Omit<SectionType, "code">): JSX.Element | null => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(true);

  if (!humanReadable) return null;

  const handleClick = () => setIsOpen(!isOpen);
  return (
    <div className={classes.container}>
      <div className={classes.headerWrapper}>
        <button type="button" className={classes.arrow} onClick={handleClick}>
          {isOpen ? "▼" : "▶"}
        </button>
        <h3>{title}</h3>
      </div>
      {isOpen && (
        <div className={classes.wrapper}>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(fixHtml(humanReadable)),
            }}
          />
        </div>
      )}
    </div>
  );
};
