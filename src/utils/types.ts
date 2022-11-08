export function isMouseEvent(e: unknown): e is MouseEvent {
  return !!(e && typeof e === "object" && "preventDefault" in e);
}
