import { ExclamationIcon, XCircleIcon } from "@heroicons/react/solid";
import { ReactNode, SVGProps } from "react";

export type AlertType = "caution" | "error";

const AlertIconMap: {
  [type in AlertType]: (props: SVGProps<SVGSVGElement>) => JSX.Element;
} = {
  caution: ExclamationIcon,
  error: XCircleIcon,
};

export type AlertProps = {
  header: string;
  children: ReactNode;
  type: AlertType;
};

export const Alert = ({ header, children, type }: AlertProps) => {
  const Icon = AlertIconMap[type];
  return (
    <div
      className={`ctw-flex ctw-items-start ctw-space-x-2 ctw-bg-${type}-bg ctw-p-4`}
    >
      <>
        <Icon className={`ctw-w-5 ctw-text-${type}-icon`} />
        <div className="ctw-space-y-2">
          <div className={`ctw-text-${type}-heading`}>{header}</div>
          <div className={`ctw-text-${type}-message`}>{children}</div>
        </div>
      </>
    </div>
  );
};
