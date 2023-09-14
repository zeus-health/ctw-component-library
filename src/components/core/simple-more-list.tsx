type SimpleMoreListProps = {
  className?: string;
  items: string[];
  limit: number;
  total: number;
  prefix?: string;
};

export const SimpleMoreList = ({ className, items, limit, total, prefix }: SimpleMoreListProps) => {
  const displayItems = items;
  if (prefix) {
    displayItems[0] = `${prefix} ${displayItems[0]}`;
  }
  return (
    <div className={className}>
      {displayItems.slice(0, limit).map((item, index) => (
        <div key={item + index}>
          <div>{item}</div>
        </div>
      ))}
      {total > limit && <div className="ctw-font-medium">+ {total - limit} more</div>}
    </div>
  );
};
