import { MouseEventHandler } from "react";
import { SVGDocument } from "@/components/core/svg-document";

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
    <SVGDocument
      className="ctw-fill-primary-dark hover:ctw-fill-primary-main"
      height={12}
    />
  </button>
);
