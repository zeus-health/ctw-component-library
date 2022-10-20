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
  <ul className="divide-y divide-gray-200 bg-white">
    {entries.map(({ title, description, onClick, render }) => (
      <li key={title} className="hover:bg-gray-50">
        <button
          type="button"
          onClick={onClick}
          className="flex w-full items-center space-x-4 p-4 text-left ring-inset"
        >
          {render || (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium hover:text-primary-700">
                {title || ""}
              </p>
              <p className="truncate text-sm text-gray-500">
                {description || ""}
              </p>
            </div>
          )}
        </button>
      </li>
    ))}
  </ul>
);
