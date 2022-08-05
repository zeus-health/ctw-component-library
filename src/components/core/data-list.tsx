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
    <div className="space-y-4 rounded-lg bg-gray-50 p-4">
      <span className="text-sm uppercase text-gray-500">{title}</span>
      <dl className="space-y-3">
        {data.map(({ label, value }, index) => (
          <div
            // label is not guarenteed to be unique so append index.
            // eslint-disable-next-line react/no-array-index-key
            key={label + index}
            className="flex items-baseline space-x-4 text-gray-900"
          >
            <dt className="w-1/3 flex-shrink-0 font-medium">{label}:</dt>
            <dd className="flex-grow">{value || ""}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
