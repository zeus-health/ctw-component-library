import { useCTW } from "@/components/core/ctw-provider";
import { useEffect, useState } from "react";
import {
  DosageItem,
  getAutoCompleteMedicationsDosage,
} from "../../../api/autocomplete-medications";
import { FormField } from "./form-field";

type DosageSelectProps = {
  medName: string;
  onChange?: (value: DosageItem) => void;
  name: string;
};

export const DosageSelect = ({
  onChange,
  medName,
  name,
}: DosageSelectProps) => {
  const { getRequestContext } = useCTW();
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<DosageItem[]>([]);

  useEffect(() => {
    if (!medName) {
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

      return dosages;
    };

    fetchDosages().then((dosages) => {
      setOptions(dosages);
    });

    setIsLoading(false);
  }, [getRequestContext, medName]);

  const handleChange = (value: string) => {
    const dosage = options.find((el) => el.text === value);
    if (dosage) onChange?.(dosage);
  };

  return (
    <FormField
      options={["Select", ...(options?.map?.((item) => item.text) || [])]}
      name={name}
      onValueChange={handleChange}
    />
  );
};
