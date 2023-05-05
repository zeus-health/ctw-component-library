import type { TableColumn } from "@/components/core/table/table-helpers";
import type { Argument } from "classnames";
import cx from "classnames";
import { useEffect, useState } from "react";
import { UserModel } from "@/api/auth/models/users";
import { getUsers } from "@/api/auth/queries/auth";
import * as CTWBox from "@/components/core/ctw-box";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { SimplePagination } from "@/components/core/pagination/simple-pagination";
import { useQueryWithCTW } from "@/components/core/providers/ctw-provider";
import { Table } from "@/components/core/table/table";
import { MinRecordItem } from "@/components/core/table/table-helpers";
import { QUERY_KEY_PATIENTS_LIST } from "@/utils/query-keys";

export type UsersTableProps = {
  className?: cx.Argument;
  pageSize?: number;
  title?: string;
} & TableOptionProps<UserModel>;

// Set of props that are optional configurations for the table.
export type TableOptionProps<T extends MinRecordItem> = {
  getRowClasses?: (row: T) => Argument; // Adds a row hover effect and calls onClick.
  onRowClick?: (row: T) => void;
};

export function useUsersList(pageSize: number, pageOffset: number) {
  return useQueryWithCTW(QUERY_KEY_PATIENTS_LIST, [pageSize, pageOffset], async (requestContext) =>
    getUsers(requestContext, pageSize, pageOffset)
  );
}

/**
 * UsersTable displays a paginated list of all users for a builder.
 */
export const UsersTable = withErrorBoundary(
  ({ className, pageSize = 10, title = "Patients" }: UsersTableProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [users, setUsers] = useState<UserModel[]>([]);
    const { data, isFetching, isError } = useUsersList(pageSize, currentPage - 1);

    // Here we are setting the total and patients only when we know that useQuery
    // isn't fetching. This will prevent empty intermediate states where there
    // is no data because the value of `usePatientsTable()` hasn't settled yet.
    useEffect(() => {
      if (!isFetching && data) {
        setUsers(data.data.map((user) => new UserModel(user)));
      }
    }, [data, isError, isFetching]);

    // This resets our state when there is an error fetching patients from ODS.
    useEffect(() => {
      if (isError) {
        setUsers([]);
      }
    }, [isError, isFetching]);

    return (
      <CTWBox.StackedWrapper
        className={cx("ctw-patients-table", className)}
        data-zus-telemetry-namespace="PatientsTable"
      >
        <CTWBox.Heading title={title} />
        <div className="ctw-overflow-hidden">
          <Table records={users} columns={columns} pageSize={pageSize} hidePagination>
            <SimplePagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              hasNext={!!data?.links.next}
            />
          </Table>
        </div>
      </CTWBox.StackedWrapper>
    );
  },
  "PatientsTable"
);

const columns: TableColumn<UserModel>[] = [
  {
    title: "Name",
    dataIndex: "name",
  },
];
