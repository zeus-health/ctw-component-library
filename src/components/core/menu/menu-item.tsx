import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";

export type MenuItemProps = {
  children: ReactNode;
  icon?: IconDefinition;
};

export function MenuItem({ children, icon }: MenuItemProps) {
  return (
    <div className="ctw-flex ctw-items-center ctw-space-x-3">
      {icon && (
        <FontAwesomeIcon
          icon={icon}
          // The 2px bottom margin helps vertically center icon with text.
          // This issue comes up as text and icons have different whitespace
          // and visually look different when vertically
          // centered normally (ctw-items-center).
          className="ctw-mb-[2px] ctw-w-4 ctw-text-content-lighter"
        />
      )}
      <div>{children}</div>
    </div>
  );
}
