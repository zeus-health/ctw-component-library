export type ErrorIconProps = {
  className?: string;
  height?: number;
};

export const ErrorIcon = ({ className, height }: ErrorIconProps) => (
  <svg
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    height={height}
  >
    <path d="M10 18C14.4062 18 18 14.4375 18 10C18 5.59375 14.4062 2 10 2C5.5625 2 2 5.59375 2 10C2 14.4375 5.5625 18 10 18ZM10 6C10.4062 6 10.75 6.34375 10.75 6.75V10.25C10.75 10.6875 10.4062 11 10 11C9.5625 11 9.25 10.6875 9.25 10.25V6.75C9.25 6.34375 9.5625 6 10 6ZM11 13C11 13.5625 10.5312 14 10 14C9.4375 14 9 13.5625 9 13C9 12.4688 9.4375 12 10 12C10.5312 12 11 12.4688 11 13Z" />
  </svg>
);
