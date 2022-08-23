export type ToggleProps = {
  name: string;
  text: string;
  inputRest?: { value: string; defaultChecked: boolean };
};

export const Toggle = ({ name, text, inputRest }: ToggleProps) => {
  return (
    <>
      <div className="ctw-relative ctw-mr-2 ctw-inline-block ctw-w-10 ctw-select-none ctw-align-middle ctw-transition ctw-duration-200 ctw-ease-in">
        <label
          htmlFor={name}
          className="ctw-relative ctw-block ctw-h-6 ctw-cursor-pointer ctw-overflow-hidden ctw-rounded-full ctw-bg-divider-light"
        >
          <input
            {...inputRest}
            type="checkbox"
            name={name}
            id={name}
            className="ctw-toggle-checkbox ctw-absolute ctw-block ctw-h-6 ctw-w-6 ctw-cursor-pointer ctw-appearance-none ctw-rounded-full ctw-border-4 ctw-bg-white"
          />
          <span className="ctw-toggle-span" />
        </label>
      </div>

      <label
        htmlFor={name}
        className="ctw-text-sm ctw-font-medium ctw-text-icon-default"
      >
        {text}
      </label>
    </>
  );
};
