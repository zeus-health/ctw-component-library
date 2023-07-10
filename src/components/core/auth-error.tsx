import { NoAuthIcon } from "./icons/no-auth-icon";

export const AuthError = () => (
  <div className="ctw-space-y-6">
    <div className="ctw-flex ctw-justify-center">
      <NoAuthIcon className="ctw-h-16" />
    </div>
    <div className="ctw-space-y-3 ctw-text-center ctw-text-base">
      <div className="ctw-text-xl ctw-font-medium">Not authorized</div>
      <div>
        Your account does not have access to this feature.
        <br />
        For further assistance, contact{" "}
        <a href="mailto:support@zushealth.com" className="ctw-text-content-black">
          support@zushealth.com
        </a>
        .
      </div>
      <div className="ctw-text-xs ctw-text-content-light">HTTP ERROR 401</div>
    </div>
  </div>
);
