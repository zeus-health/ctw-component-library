// Like Partial except recursively sets all keys on an object to optional.
export type Subset<K> = {
  [attr in keyof K]?: K[attr] extends object ? Subset<K[attr]> : K[attr];
};

export function isMouseEvent(e: unknown): e is MouseEvent {
  return !!(e && typeof e === "object" && "preventDefault" in e);
}
