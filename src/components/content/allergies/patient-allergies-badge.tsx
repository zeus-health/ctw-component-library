import { useEffect, useState } from "react";
import { Badge } from "@/components/core/badge";
import { useCTW } from "@/components/core/providers/use-ctw";
import { usePatientAllergies } from "@/fhir/allergies";

export const PatientAllergiesBadge = () => {
  const query = usePatientAllergies();
  const { getRequestContext } = useCTW();

  const [userBuilderId, setUserBuilderId] = useState("");

  useEffect(() => {
    async function load() {
      const requestContext = await getRequestContext();
      setUserBuilderId(requestContext.builderId);
    }

    void load();
  }, [getRequestContext]);

  const unreadOutsideAllergies = query.data.filter(
    (allergy) => !allergy.isDismissed && !allergy.isRead && !allergy.ownedByBuilder(userBuilderId)
  );

  if (unreadOutsideAllergies.length > 0) {
    return (
      <Badge
        color="notification"
        text={unreadOutsideAllergies.length.toString()}
        className="ctw-h-5"
      />
    );
  }
  return null;
};
