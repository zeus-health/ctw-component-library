import { ExclamationIcon } from "@heroicons/react/solid";
import { ReactNode } from "react";

export type AlertDialogProps = {
  resourceType: string;
  children: ReactNode;
};

export const AlertDialog = ({ resourceType, children }: AlertDialogProps) => (
  <div className="ctw-flex ctw-items-start ctw-space-x-2 ctw-bg-caution-bg ctw-p-4">
    <ExclamationIcon className="ctw-w-5 ctw-text-caution-icon" />
    <div className="ctw-space-y-2">
      <div className="ctw-text-caution-heading">{resourceType}</div>
      <div className="ctw-text-caution-message">{children}</div>
    </div>
  </div>
);
