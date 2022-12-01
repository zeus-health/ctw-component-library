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
    {required && (
      <>
        <div className="ctw-flex-grow ctw-text-icon-default">*</div>
      </>
    )}
  </div>
);
