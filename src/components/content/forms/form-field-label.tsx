export const FormFieldLabel = ({
  label,
  required,
  name,
}: {
  label: string;
  name: string;
  required: boolean | undefined;
}) => (
  <div className="ctw-flex ctw-justify-between">
    <label htmlFor={name}>{label}</label>
    {!required && (
      <span className="ctw-right-0 ctw-inline-block ctw-text-xs ctw-text-content-light">
        Optional
      </span>
    )}
    {required && (
      <>
        <div className="ctw-flex-grow ctw-text-icon-default">*</div>
      </>
    )}
  </div>
);
