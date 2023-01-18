import cx from "classnames";
import "./patient-conditions.scss";
import { useRef } from "react";
import { useConditionHistory } from "../condition-history/conditions-history-drawer";
import { filterOtherConditions } from "./helpers";
import { patientConditionsColumns } from "./patient-conditions-columns";
import { useConditionFilters } from "./patient-conditions-filters";
import {
  OtherProviderConditionHoverActions,
  PatientConditionHoverActions,
} from "./patient-conditions-menu-actions";
import { Badge } from "@/components/core/badge";
import { FormEntry } from "@/components/core/form/drawer-form-with-fields";
import { Table } from "@/components/core/table/table";
import {
  useOtherProviderConditions,
  usePatientConditions,
} from "@/fhir/conditions";
import { useBreakpoints } from "@/hooks/use-breakpoints";
import { AnyZodSchema } from "@/utils/form-helper";
import { Tab } from "@headlessui/react";

export type PatientConditionsProps = {
  className?: string;
  readOnly?: boolean;
};

export type ConditionFormData = {
  schema: AnyZodSchema;
  actionType: string;
  data: FormEntry[] | undefined;
  drawerIsOpen: boolean;
};

export function PatientConditions({
  className,
  readOnly = false,
}: PatientConditionsProps) {
  // State.
  const { filters, updateFilters, applyFilters } = useConditionFilters();
  const containerRef = useRef<HTMLDivElement>(null);
  const breakpoints = useBreakpoints(containerRef);

  // Drawer helpers.
  const showConditionHistory = useConditionHistory();

  // Data fetching.
  const patientConditionsQuery = usePatientConditions();
  const otherConditionsQuery = useOtherProviderConditions();

  function isLoading() {
    const isLoadingPatient = patientConditionsQuery.isLoading;
    const isLoadingOther = isLoadingPatient || otherConditionsQuery.isLoading;
    return filters.collection === "patient" ? isLoadingPatient : isLoadingOther;
  }

  // Get our conditions.
  const patientConditions = patientConditionsQuery.data ?? [];
  const otherConditions = filterOtherConditions(
    otherConditionsQuery.data ?? [],
    patientConditions,
    true
  );
  const RowActions =
    filters.collection === "patient"
      ? PatientConditionHoverActions
      : OtherProviderConditionHoverActions;


  const tabbedContent = [
    {
      key: "condition-list",
      display: () => "Condition List",
      render: () => <Table
        stacked={breakpoints.sm}
        className="-ctw-mx-px !ctw-rounded-none"
        showTableHead={false}
        isLoading={isLoading()}
        records={applyFilters(patientConditions)}
        RowActions={readOnly ? undefined : RowActions}
        columns={patientConditionsColumns}
        handleRowClick={(condition) =>
          showConditionHistory({
            condition,
            readOnly: readOnly || condition.isSummaryResource,
          })
        }
      />
    },
    {
      key: "other-provider-records",
      display: () => <>
        Other Provider Records
        <Badge text="activeCount" color="primary" />
      </>,
      render: () => <Table
        stacked={breakpoints.sm}
        className="-ctw-mx-px !ctw-rounded-none"
        showTableHead={false}
        isLoading={isLoading()}
        records={applyFilters(otherConditions)}
        RowActions={readOnly ? undefined : RowActions}
        columns={patientConditionsColumns}
        handleRowClick={(condition) =>
          showConditionHistory({
            condition,
            readOnly: readOnly || condition.isSummaryResource,
          })
        }
      />,
    },
  ];

  return (
    <div
      ref={containerRef}
      className={cx("ctw-patient-conditions", className, {
        "ctw-patient-conditions-stacked": breakpoints.sm,
      })}
    >
      <div className="ctw-items-center ctw-justify-between ctw-py-5 ctw-px-4">
        <div className="ctw-text-xl ctw-font-medium ctw-text-content-black">
          Conditions
        </div>
        <Tab.Group>
          <Tab.List className="ctw-flex ctw-space-x-1 ctw-rounded-xl ctw-p-1">
            {tabbedContent.map(({ key, display }) => (
              <Tab
                key={key}
                className={({ selected }) =>
                  cx(
                    "ctw-w-full ctw-rounded-lg ctw-py-2.5 ctw-text-sm ctw-font-medium",
                    "ctw-ring-white ctw-ring-opacity-60 ctw-ring-offset-2 focus:ctw-outline-none focus:ctw-ring-2",
                    selected
                      ? "ctw-bg-white ctw-shadow"
                      : "hover:ctw-bg-white/[0.12] ctw-cursor-pointer hover:ctw-text-white"
                  )
                }
              >
                {display()}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            {tabbedContent.map(({ key, render }) => (
              <Tab.Panel
                key={key}
                className={cx(
                  "ctw-rounded-xl ctw-p-3",
                  "focus:outline-none focus:ring-2"
                )}
              >
                {render()}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
