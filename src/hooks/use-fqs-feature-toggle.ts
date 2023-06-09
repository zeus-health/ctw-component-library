import { useVariant } from "@unleash/proxy-client-react";

export function useFQSFeatureToggle(resourceType: string) {
  // const { getRequestContext } = useCTW();

  // // update the unleash context with the user's data
  // const updateContext = useUnleashContext();
  // useEffect(() => {
  //   void getRequestContext().then(({ authToken }) => {
  //     const unleashContext = getUnleashContext(authToken);
  //     void updateContext(unleashContext);
  //   });
  // }, [getRequestContext, updateContext]);

  // fetch the variant and check if the resource type is enabled
  const variant = useVariant("ctw-fqs");
  if (variant.enabled) {
    const value = variant.payload?.value;
    if (value !== undefined) {
      const valueJson = JSON.parse(value);
      if (valueJson[resourceType] === true) {
        return true;
      }
    }
  }
  return false;
}

// function getUnleashContext(authToken: string) {
//   const decoded = jwtDecode(authToken) as { [key: string]: string };
//   return {
//     userId: decoded["https://zusapi.com/user_id"],
//     properties: {
//       builderId: decoded["https://zusapi.com/builder_id"],
//       builderName: decoded["https://zusapi.com/builder_name"],
//       userType: decoded["https://zusapi.com/user_type"],
//       email: decoded["https://zusapi.com/email"],
//     },
//   };
// }
