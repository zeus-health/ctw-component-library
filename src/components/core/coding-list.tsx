export type CodingListProps = {
  codings: fhir4.Coding[];
};

export const CodingList = ({ codings }: CodingListProps) => (
  <div>
    <div className="ctw-flex ctw-flex-col ctw-space-y-4">
      {codings.map((coding) => (
        <div key={`${coding.id}-${coding.code}`}>
          {coding.display}
          <div>{coding.code}</div>
          <div>{coding.system}</div>
        </div>
      ))}
    </div>
  </div>
);
