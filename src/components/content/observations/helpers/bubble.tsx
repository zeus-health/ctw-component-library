export type BubbleIconProps = {
  status: string;
};

export const BubbleIcon = ({ status }: BubbleIconProps) => (
  <div className={statusToColor(status)}>{status}</div>
);

function statusToColor(status: string) {
  switch (status) {
    case "High":
      return "ctw-text-caution-heading ctw-bg-caution-light ctw-inline-flex ctw-rounded-full ctw-px-2 ctw-text-xs ctw-leading-5";
    default:
      return "ctw-text-caution-heading ctw-bg-bg-light ctw-inline-flex ctw-rounded-full ctw-px-2 ctw-text-xs ctw-leading-5";
  }
}
