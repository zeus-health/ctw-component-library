import cx from "classnames";
import { isFunction } from "lodash/fp";
import "./action-list.scss";

export type MinActionItem = {
  id: string;
  subtitle?: string;
  title: string;
  complete: boolean;
};

export type ActionItemProps<T extends MinActionItem> = {
  className?: string;
  item: T;
  onAction: (i: T) => void;
  onRowClick?: (i: T) => void;
  actionText: string;
  activeClassName?: string;
  onUndoAction?: (i: T) => void;
  undoActionText?: string;
};

export type ActionListProps<T extends MinActionItem> = {
  items: T[];
} & Omit<ActionItemProps<T>, "item">;

export const ActionList = <T extends MinActionItem>({
  items,
  className,
  ...itemProps
}: ActionListProps<T>) => (
  <ul
    className={cx("ctw-action-list ctw-rounded-lg", className, {
      "ctw-border-0": items.length === 0,
      "ctw-bg-bg-lighter": items.length > 0,
    })}
  >
    {items.map((item) => (
      <ActionListItem key={item.id} item={item} {...itemProps} />
    ))}
  </ul>
);

export const ActionListItem = <T extends MinActionItem>({
  item,
  onRowClick,
  onAction,
  actionText = "Mark Complete",
  undoActionText = "Undo",
  onUndoAction,
  activeClassName = "active",
}: ActionItemProps<T>) => (
  <li
    role="row"
    className={cx(
      "ctw-action-list-item",
      "ctw-border-lighter ctw-flex ctw-cursor-pointer ctw-p-4",
      {
        [activeClassName]: !item.complete,
        undoable: isFunction(onUndoAction),
      }
    )}
    onKeyDown={(evt) => {
      // Visible, non-intercomplete elements with click handlers must have at least 1 keyboard listener
      if (evt.key === "Enter") {
        evt.currentTarget.click();
      }
    }}
    onClick={() => onRowClick?.(item)}
  >
    <div className="ctw-action-list-item-content ctw-flex-grow">
      <div className="ctw-font-semibold">{item.title}</div>
      {item.subtitle && <div className="ctw-font-light">{item.subtitle}</div>}
    </div>
    <div className="ctw-action-list-item-action">
      {!item.complete && (
        <button
          type="button"
          className="ctw-btn-primary"
          onClick={(evt) => {
            evt.stopPropagation();
            onAction(item);
          }}
        >
          {actionText}
        </button>
      )}

      {item.complete && !!onUndoAction && (
        <button
          type="button"
          className="ctw-btn-default"
          onClick={(evt) => {
            evt.stopPropagation();
            onUndoAction(item);
          }}
        >
          {undoActionText}
        </button>
      )}
    </div>
  </li>
);
