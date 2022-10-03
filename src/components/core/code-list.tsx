export const CodeList = ({ codes }: { codes: string[] }) => (
  <div className="ctw-text-gray-900 ctw-flex ctw-items-baseline -ctw-space-x-6">
    <div className="ctw-flex ctw-flex-col ctw-space-y-1">
      {codes.map((code: string) => {
        if (code) {
          return <div className="ctw-flex-grow">{code}</div>;
        }
        return <></>;
      })}
    </div>
  </div>
);
