export type CodingListProps = {
  codings: fhir4.Coding[];
};

export const CodingList = ({ codings }: CodingListProps) => (
  <div className="ctw-text-gray-900 ctw-flex ctw-items-baseline -ctw-space-x-6">
    <div className="ctw-flex ctw-flex-col ctw-space-y-1">
      {codings.map((coding: fhir4.Coding) => (
        <div className="ctw-flex-grow">
          {coding.display}
          <div>{coding.code}</div>
          <div>{coding.system}</div>
        </div>
      ))}
    </div>
  </div>
);
