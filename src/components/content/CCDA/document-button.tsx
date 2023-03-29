import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEventHandler } from "react";

export type DocumentButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  text: string;
};

export const DocumentButton = ({ onClick, text }: DocumentButtonProps) => (
  <button
    type="button"
    className="ctw-btn-clear ctw-link ctw-flex ctw-items-center ctw-space-x-2"
    onClick={onClick}
  >
    <FontAwesomeIcon icon={faFileLines} className="ctw-h-3" />
    <div>{text}</div>
  </button>
);
