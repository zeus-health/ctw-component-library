// Like Partial except recursively sets all keys on an object to optional.
export type Subset<K> = {
  [attr in keyof K]?: K[attr] extends object ? Subset<K[attr]> : K[attr];
};
