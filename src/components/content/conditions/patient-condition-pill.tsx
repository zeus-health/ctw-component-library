export type PatientConditionPillProps = {
  title: string;
  items: string[];
};

export const PatientConditionPill = ({
  title,
  items,
}: PatientConditionPillProps) => (
  <div className="ctw-w-max-[240px] ctw-flex ctw-space-x-2 ctw-rounded-md ctw-bg-bg-dark ctw-py-2 ctw-px-3">
    <div className="ctw-font-medium ctw-capitalize">{title}:</div>
    <div>{items.join(", ")}</div>
  </div>
);
