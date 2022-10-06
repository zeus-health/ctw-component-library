import { ReactNode } from "react";
import alert from "./alert.svg";

export type AlertDialogProps = {
  resourceType: string;
  children: ReactNode;
};

export const AlertDialog = ({ resourceType, children }: AlertDialogProps) => (
  <div className="ctw-flex ctw-items-start ctw-space-x-2 ctw-bg-caution-bg ctw-p-4">
    <img src={alert} alt="alert" className="ctw-shrink-0" />
    <div className="ctw-space-y-2">
      <div className="ctw-flex ctw-text-caution-heading">
        {resourceType} Unavailable
      </div>
      <div className="ctw-text-caution-message">{children}</div>
    </div>
  </div>
);
