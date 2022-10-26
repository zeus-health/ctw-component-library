import type { ReactNode } from "react";

export type StackedListEntry = {
  title?: string;
  description?: string;
  onClick: () => void;
  render?: ReactNode;
};

export type StackedListProps = {
  entries: StackedListEntry[];
};

export const StackedList = ({ entries }: StackedListProps) => (
  <ul className="ctw-divide-gray-200 ctw-divide-y ctw-bg-white">
    {entries.map(({ title, description, onClick, render }) => (
      <li key={title} className="ctw-hover:ctw-bg-gray-50">
        <button
          type="button"
          onClick={onClick}
          className="ctw-flex ctw-w-full ctw-items-center ctw-space-x-4 ctw-p-4 ctw-text-left ctw-ring-inset"
        >
          {render || (
            <div className="ctw-min-w-0 ctw-flex-1">
              <p className="ctw-hover:text-primary-700 ctw-truncate ctw-text-sm ctw-font-medium">
                {title || ""}
              </p>
              <p className="ctw-text-gray-500 ctw-truncate ctw-text-sm">
                {description || ""}
              </p>
            </div>
          )}
        </button>
      </li>
    ))}
  </ul>
);
