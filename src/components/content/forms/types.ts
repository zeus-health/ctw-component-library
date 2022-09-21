export type ActionReturn<T> =
  | { success: true | false; data: T; errors: undefined }
  | { success: false; data: undefined; errors: { [key: string]: string } };
