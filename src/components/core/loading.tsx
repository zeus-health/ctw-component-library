import { Spinner } from "@/components/core/spinner";

export const Loading = ({ message = "Loading..." }) => (
  <div className="ctw-space-x-2">
    {message && <span className="ctw-text-sm ctw-italic">{message}</span>}
    <Spinner />
  </div>
);
