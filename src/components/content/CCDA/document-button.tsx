import { DocumentIcon } from "@heroicons/react/outline";
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
    <div>{text}</div>
    <DocumentIcon
      className="ctw-fill-primary-dark hover:ctw-fill-primary-main"
      height={12}
    />
  </button>
);
