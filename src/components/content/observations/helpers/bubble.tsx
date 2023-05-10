export type BubbleIconProps = {
  status?: string;
  result: string;
};

export const BubbleIcon = ({ result, status }: BubbleIconProps) =>
  status ? (
    <div className={statusToColor(status)}>
      {result}-{status}
    </div>
  ) : (
    <div className={statusToColor("")}>{result}</div>
  );

function statusToColor(status: string) {
  switch (status.toLowerCase()) {
    case "high":
    case "(high)":
    case "h":
      return "ctw-text-caution-heading ctw-bg-caution-light ctw-inline-flex ctw-rounded-full ctw-px-2 ctw-text-xs ctw-leading-5";
    default:
      return "ctw-text-content-black ctw-bg-bg-light ctw-inline-flex ctw-rounded-full ctw-px-2 ctw-text-xs ctw-leading-5";
  }
}
