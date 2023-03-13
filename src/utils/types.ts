export function isMouseEvent(e: unknown): e is MouseEvent {
  return !!(e && typeof e === "object" && "preventDefault" in e);
}

export const hasNumber = (str: string | number | undefined) =>
  /\d/.test(String(str));

// Properly check if the value is an "empty" value.
// This works better than lodash's isEmpty in that it properly handles
// number and boolean types.
// See https://medium.com/@trmaphi/lodash-isempty-value-you-might-be-using-it-the-wrong-way-d83210d7decf
export const isEmptyValue = (value: unknown) =>
  value === undefined ||
  value === null ||
  Number.isNaN(value) ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
