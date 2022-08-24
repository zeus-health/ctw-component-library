import { FormEvent } from "react";
import { Toggle, ToggleProps } from "./toggle";

export type ToggleControlProps = {
  toggleProps: ToggleProps;
  onFormChange: (e: FormEvent<HTMLFormElement>) => void;
};

export const ToggleControl = ({
  toggleProps,
  onFormChange,
}: ToggleControlProps) => {
  return (
    <form onChange={onFormChange} className="ctw-text-end">
      <Toggle {...toggleProps} />
    </form>
  );
};
