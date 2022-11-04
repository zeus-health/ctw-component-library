import { useCTW } from "@/components/core/ctw-provider";
import { useEffect, useState } from "react";
import { getAutoCompleteMedicationsDosage } from "../../../api/autocomplete-medications";
import { FormField } from "./form-field";

export const DosageSelect = ({
  onValueChange,
  medName,
}: {
  medName: string;
  onValueChange?: (value: string) => void;
}) => {
  const { getRequestContext } = useCTW();
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    if (!medName) {
      setOptions([]);
      return;
    }
    setIsLoading(true);

    const fetchDosages = async () => {
      const { authToken, env } = await getRequestContext();
      const dosages = await getAutoCompleteMedicationsDosage(
        authToken,
        env,
        medName
      );

      return dosages.map((item) => item.text);
    };

    fetchDosages().then((dosages) => {
      setOptions(dosages);
    });

    setIsLoading(false);
  }, [getRequestContext, medName]);

  return <FormField options={options} />;
};
