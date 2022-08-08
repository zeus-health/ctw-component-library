export type DataListEntry = {
  label: string;
  value?: string;
};

export type DataListProps = {
  title: string;
  data: DataListEntry[];
};

export function entryFromArray(label: string, array: string[]) {
  return array.map((value) => ({
    label,
    value,
  }));
}

export function DataList({ title, data }: DataListProps) {
  return (
    <div className="ctw-space-y-4 ctw-rounded-lg ctw-bg-gray-50 ctw-p-4">
      <span className="ctw-text-sm ctw-uppercase ctw-text-gray-500">
        {title}
      </span>
      <dl className="ctw-space-y-3">
        {data.map(({ label, value }, index) => (
          <div
            // label is not guarenteed to be unique so append index.
            // eslint-disable-next-line react/no-array-index-key
            key={label + index}
            className="ctw-flex ctw-items-baseline ctw-space-x-4 ctw-text-gray-900"
          >
            <dt className="ctw-w-1/3 ctw-flex-shrink-0 ctw-font-medium">
              {label}:
            </dt>
            <dd className="ctw-flex-grow">{value || ""}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
