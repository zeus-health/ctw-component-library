export const CodeListElement = ({ label, value }) => (
  <div
    // label is not guarenteed to be unique so append index.
    // eslint-disable-next-line react/no-array-index-key
    key={label + Math.random}
    className="ctw-text-gray-900 ctw-flex ctw-items-baseline -ctw-space-x-6"
  >
    <dt className="ctw-w-1/3 ctw-flex-shrink-0 ctw-font-medium">{label}</dt>
    <div className="ctw-flex ctw-flex-col ctw-space-y-1">
      {value.map((val: string) => {
        if (val) {
          return <dd className="ctw-flex-grow">{val}</dd>;
        }
      })}
    </div>
  </div>
);
