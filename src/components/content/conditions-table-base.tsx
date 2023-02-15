import { DotsHorizontalIcon } from "@heroicons/react/outline";
import { DropdownMenu, MenuItem } from "../core/dropdown-menu";
import { Table, TableBaseProps } from "../core/table/table";
import { TableColumn } from "../core/table/table-helpers";
import { ConditionModel } from "@/fhir/models/condition";

export type ConditionsTableBaseProps = {
  className?: string;
  conditions: ConditionModel[];
  rowMenuActions: (condition: ConditionModel) => MenuItem[];
  hideMenu: boolean;
} & TableBaseProps<ConditionModel>;

export function ConditionsTableBase({
  className,
  conditions,
  rowMenuActions,
  hideMenu,
  sort = { columnTitle: "Last Recorded", dir: "desc" },
  onSort,
  ...tableProps
}: ConditionsTableBaseProps) {
  const columns: TableColumn<ConditionModel>[] = [
    {
      title: "Condition",
      dataIndex: "display",
      widthPercent: 40,
      minWidth: 320,
      sortIndices: [
        { index: "display" },
        { index: "recorded", dir: "desc", isDate: true },
      ],
    },
    {
      title: "Category",
      dataIndex: "ccsGrouping",
      widthPercent: 25,
      minWidth: 192,
      sortIndices: [{ index: "ccsGrouping" }, { index: "display", dir: "asc" }],
    },
    {
      title: "Status",
      render: (condition) => (
        <div className="ctw-capitalize">
          <div className="ctw-text-content-black">
            {condition.clinicalStatus}
          </div>
          <div>
            {condition.isArchived ? "Archived" : condition.verificationStatus}
          </div>
        </div>
      ),
      widthPercent: 17.5,
      minWidth: 128,
      sortIndices: [
        { index: "clinicalStatus" },
        { index: "verificationStatus" },
        { index: "recorded", dir: "desc", isDate: true },
      ],
    },
    {
      title: "Last Recorded",
      dataIndex: "recordedDate",
      widthPercent: 17.5,
      minWidth: 132,
      sortIndices: [
        { index: "recorded", isDate: true },
        { index: "display", dir: "asc" },
      ],
    },
  ];

  if (!hideMenu) {
    columns.push({
      className: "ctw-table-action-column",
      render: (condition: ConditionModel) => (
        <DropdownMenu
          menuItems={rowMenuActions(condition)}
          telemetryNamespace="ConditionsTableBase"
        >
          <DotsHorizontalIcon className="ctw-w-5" />
        </DropdownMenu>
      ),
    });
  }

  return (
    <Table
      className={className}
      records={conditions}
      columns={columns}
      sort={sort}
      onSort={onSort}
      {...tableProps}
    />
  );
}
