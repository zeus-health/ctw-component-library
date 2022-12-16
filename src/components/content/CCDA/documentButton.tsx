import { MouseEventHandler } from "react";

export type DocumentButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
};

export const DocumentButton = ({ onClick }: DocumentButtonProps) => (
  <button
    type="button"
    className="ctw-btn-default ctw-flex ctw-space-x-2 ctw-align-middle"
    onClick={onClick}
  >
    <div> Source Document</div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      height={12}
      className="ctw-mt-1"
    >
      <path d="M352 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h50.7L297.4 169.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V160c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H352zM214.6 297.4c-12.5-12.5-32.8-12.5-45.3 0L64 402.7V352c0-17.7-14.3-32-32-32s-32 14.3-32 32V480c0 17.7 14.3 32 32 32H160c17.7 0 32-14.3 32-32s-14.3-32-32-32H109.3L214.6 342.6c12.5-12.5 12.5-32.8 0-45.3z" />
    </svg>
  </button>
);
