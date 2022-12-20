/* eslint-disable react/no-danger */ // silent linter for dangerouslySetInnerHTML because it is taken care of using dompurify
import DOMPurify from "dompurify";
import { useState } from "react";
import { fixHtml } from "../../helpers";
import { SectionType } from "../../types";
import "../../../styles.scss";

export const Section = ({
  title,
  humanReadable,
}: Omit<SectionType, "code">): JSX.Element | null => {
  const [isOpen, setIsOpen] = useState(true);

  // TODO - remove eslint
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!humanReadable) return null;

  const handleClick = () => setIsOpen(!isOpen);
  return (
    <div className="ctw-ccda-section-container">
      <div className="ctw-ccda-section-header-wrapper">
        <button
          type="button"
          className="ctw-ccda-section-arrow"
          onClick={handleClick}
        >
          {isOpen ? "▼" : "▶"}
        </button>
        <h3>{title}</h3>
      </div>
      {isOpen && (
        <div className="ctw-ccda-section-wrapper">
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
