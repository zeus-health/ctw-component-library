import { Badge } from "@/components/core/badge";

export const ActiveColumn = ({ status }: { status: string }) => {
  function statusToColor() {
    switch (status.toLowerCase()) {
      case "inactive":
        return "caution";
      case "active":
        return "good";
      default:
        return "caution";
    }
  }

  return <Badge color={statusToColor()} text={status} className="uppercase" />;
};
