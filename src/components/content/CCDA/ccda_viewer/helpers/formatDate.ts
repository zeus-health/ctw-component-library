import { format } from "date-fns";

export const formatDate = (isoDate: string | undefined): string => {
  if (!isoDate) return "";
  const [date, time] = isoDate.split("T");

  return (
    format(new Date(date), "MMMM dd, yyyy") +
    (time.split("").some((char) => Number(char) > 0) ? `, ${time}` : "")
  );
};
