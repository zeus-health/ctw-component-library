import { Combobox } from "@headlessui/react";
import { useEffect, useState } from "react";
import ZusSVG from "@/assets/zus.svg";
import { withErrorBoundary } from "@/components/core/error-boundary";
import {
  ComboboxField,
  ComboxboxFieldOption,
} from "@/components/core/form/combobox-field";
import { useQueryWithCTW } from "@/components/core/providers/ctw-provider";
import { PatientModel } from "@/fhir/models";
import { getBuilderPatientsList } from "@/fhir/patient-helper";
import { QUERY_KEY_PATIENTS_LIST } from "@/utils/query-keys";

export function usePatientSearchList(
  pageSize: number,
  pageOffset: number,
  searchNameValue?: string
) {
  return useQueryWithCTW(
    QUERY_KEY_PATIENTS_LIST,
    [pageSize, pageOffset, searchNameValue],
    getBuilderPatientsList,
    !!searchNameValue
  );
}

type CustomPatientOptionValue = Omit<ComboxboxFieldOption, "value"> & {
  value: PatientModel;
};

export type PatientSearchProps = {
  pageSize?: number;
  removeBranding?: boolean;
  onSearchClick?: (e: unknown) => void;
};

export const PatientSearch = withErrorBoundary(
  ({
    pageSize = 250,
    removeBranding = false,
    onSearchClick,
  }: PatientSearchProps) => {
    const [patients, setPatients] = useState<PatientModel[]>([]);
    const [searchNameValue, setSearchNameValue] = useState<
      string | undefined
    >();
    const {
      data: { patients: responsePatients, total: responseTotal } = {},
      isFetching,
      isError,
    } = usePatientSearchList(pageSize, 0, searchNameValue);

    // Here we are setting the total and patients only when we know that useQuery
    // isn't fetching. This will prevent empty intermediate states where there
    // is no data because the value of `usePatientsTable()` hasn't settled yet.
    useEffect(() => {
      if (!isFetching && responsePatients) {
        setPatients(responsePatients);
      }
    }, [responsePatients, responseTotal, isError, isFetching]);

    // This resets our state when there is an error fetching patients from ODS.
    useEffect(() => {
      if (isError) {
        setPatients([]);
      }
    }, [isError, isFetching]);

    return (
      <div className="ctw-max-w-3xl ctw-space-y-5 ctw-text-center">
        <h3 className="ctw-my-0">Search for a Patient</h3>
        {!removeBranding && (
          <span className="ctw-block ctw-space-x-2 ctw-text-sm ctw-font-light ctw-italic ctw-text-content-light">
            <span>Powered by</span>
            <img src={ZusSVG} alt="Zus" className="-ctw-mb-1.5" />
          </span>
        )}
        <ComboboxField
          enableSearchIcon
          options={patients.map((patient) => ({
            value: patient,
            label: patient.fullName,
            key: patient.id,
          }))}
          readonly={false}
          isLoading={isFetching}
          name="patient-search"
          defaultSearchTerm=""
          onCustomSelectChange={onSearchClick}
          renderCustomOption={(e) => (
            <CustomComboBox option={e as CustomPatientOptionValue} />
          )}
          onSearchChange={(e) => {
            setSearchNameValue(e);
            setPatients([]);
          }}
          defaultValue={{}}
        />
      </div>
    );
  },
  "PatientsSearch"
);

const CustomComboBox = ({ option }: { option: CustomPatientOptionValue }) => (
  <Combobox.Option
    value={option.label}
    className={({ active }) =>
      `ctw-relative ctw-flex ctw-cursor-default ctw-select-none ctw-space-x-2 ctw-py-2 ctw-pr-4 ctw-pl-4 ${
        active
          ? "ctw-bg-primary-light ctw-text-primary-dark"
          : "ctw-text-content-black"
      }`
    }
  >
    <div className="ctw-space-x-1">
      <span className="ctw-font-medium">{option.value.fullName}</span>
      <span className="ctw-font-medium">
        {option.value.gender && `(${option.value.gender[0].toUpperCase()})`}
      </span>
    </div>

    <div className="ctw-space-x-1">
      <span>{option.value.dob}</span>
      <span>{option.value.age && `(${option.value.age})`}</span>
    </div>
  </Combobox.Option>
);
