import { ChangeEvent } from "react";
import "./toggle.scss";

export type ToggleProps = {
  name: string;
  text: string;
  inputProps?:
    | {
        value: string;
        defaultChecked: boolean;
      }
    | {
        value: string;
        checked: boolean;
        disabled: boolean;
      };
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const Toggle = ({ name, text, onChange, inputProps }: ToggleProps) => (
  <div className="ctw-toggle">
    <div className="ctw-relative ctw-mr-2 ctw-inline-block ctw-w-10 ctw-select-none ctw-align-middle ctw-transition ctw-duration-200 ctw-ease-in">
      <label
        htmlFor={name}
        className="ctw-relative ctw-block ctw-h-6 ctw-cursor-pointer ctw-overflow-hidden ctw-rounded-full ctw-bg-divider-light"
      >
        <input onChange={onChange} {...inputProps} type="checkbox" name={name} id={name} />
        <span className="ctw-toggle-span" />
      </label>
    </div>

    <label htmlFor={name} className="ctw-text-sm ctw-font-medium ctw-text-icon-default">
      {text}
    </label>
  </div>
);
