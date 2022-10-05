import alert from "./alert.png";

export type AlertDialogProps = {
  resourceType: string;
  message: string;
};

export const AlertDialog = ({ resourceType, message }: AlertDialogProps) => (
  <div className="ctw-bg-bg-yellow ctw-p-4">
    <div className="ctw-text-caution-burgundy">
      <img src={alert} alt="alert" /> {resourceType} Unavailable
    </div>
    <div className="ctw-text-caution-lightred">{message}</div>
  </div>
);
