import alert from "./alert.png";

export const AlertDialog = () => (
  <div className="ctw-bg-bg-yellow ctw-p-4">
    <div className="ctw-text-caution-burgundy">
      <img src={alert} alt="alert" /> Conditions Unavailable
    </div>
    <div className="ctw-text-caution-lightred">
      We are unable to access Condition information for this patient.
    </div>
    <div className="ctw-text-caution-lightred">
      Contact your system administrator or customer service for assistance.
    </div>
  </div>
);
