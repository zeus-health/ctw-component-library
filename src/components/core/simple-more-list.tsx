type SimpleMoreListProps = {
  className?: string;
  items: string[];
  limit: number;
  total: number;
};

export const SimpleMoreList = ({ className, items, limit, total }: SimpleMoreListProps) => (
  <div className={className}>
    {items.slice(0, limit).map((item, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <div key={item + index}>
        <div>{item}</div>
      </div>
    ))}
    {total > limit && <div className="ctw-font-medium">+ {total - limit} more</div>}
  </div>
);
