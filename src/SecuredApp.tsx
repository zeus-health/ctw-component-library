// eslint-disable-next-line import/no-extraneous-dependencies
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { FunctionComponent, useEffect, useState } from "react";

type SecuredAppProps = {
  AppComponent: FunctionComponent<{ accessToken: string }>;
};

const SecuredAppComponent = ({ AppComponent }: SecuredAppProps) => {
  const { getAccessTokenSilently, logout } = useAuth0();
  const [authToken, setAuthToken] = useState("");
  const returnTo = new URL("login", window.location.origin).toString();

  useEffect(() => {
    const getToken = async () => {
      setAuthToken(await getAccessTokenSilently());
    };
    getToken();
  }, [getAccessTokenSilently]);

  return (
    <>
      <button
        type="button"
        onClick={() => logout({ returnTo })}
        className="ctw-w-full ctw-cursor-pointer ctw-bg-transparent ctw-p-0 ctw-text-base ctw-outline-none"
      >
        Log Out
      </button>

      {authToken && <AppComponent accessToken={authToken} />}
    </>
  );
};

export const SecuredApp = withAuthenticationRequired(SecuredAppComponent, {
  onRedirecting: () => <strong>Redirecting you to login</strong>,
});
