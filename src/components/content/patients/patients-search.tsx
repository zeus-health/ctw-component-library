import { useEffect, useState } from "react";
import ZusSVG from "@/assets/zus.svg";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { ComboboxField } from "@/components/core/form/combobox-field";
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

export const PatientSearch = withErrorBoundary(
  ({
    pageSize = 250,
    removeBranding = false,
  }: {
    pageSize?: number | undefined;
    removeBranding?: boolean;
  }) => {
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
      <div className="ctw-space-y-5 ctw-text-center">
        <h3 className="ctw-my-0">Search for a Patient</h3>
        {!removeBranding && (
          <span className="ctw-block ctw-text-sm ctw-font-light ctw-italic ctw-text-content-light">
            Powered by <img src={ZusSVG} alt="Zus" className="-ctw-mb-1.5" />
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
