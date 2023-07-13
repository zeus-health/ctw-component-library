import cx from "classnames";

export type SpinnerProps = {
  className?: string;
  size?: number;
};

export const Spinner = ({ className, size = 4 }: SpinnerProps) => (
  <svg
    className={cx(`ctw-inline ctw-h-${size} ctw-w-${size} ctw-animate-spin`, className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="ctw-opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="ctw-opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);
