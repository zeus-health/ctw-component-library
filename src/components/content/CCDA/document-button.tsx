import { MouseEventHandler } from "react";
import { DocumentIcon } from "@/components/core/document-icon";

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
    <DocumentIcon height={12} />
  </button>
);
