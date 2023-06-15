// Takes a fqs graphql response and returns a new one that removes nulls and undefineds
// and replaces aliased field names with their source field name.
// 1. Remoes all empty arrays.
//    This fixes an issue where ODS will complain with:
//    "Array cannot be empty - the property should not be present if it has no values"
// 2. Removes all null and undefined values.
// 3. Replaces aliased field names in the format '_somealias__field' with 'field'.
export const graphQLToFHIR = <T>(value: T): T =>
  // Cast because the function that finds and omits arrays produces an unknown.
  graphQLToFHIRHelper(value) as T;

const graphQLToFHIRHelper = (value: unknown): unknown => {
  const aliasRegEx = /_[^_]+__(\w+)/;
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return undefined;
    }
    return value.map(graphQLToFHIR);
  }

  if (value !== null && typeof value === "object") {
    const newValue = value as { [key: string]: unknown };
    Object.entries(newValue).forEach(([key, v]) => {
      if (aliasRegEx.test(key)) {
        const match = key.match(aliasRegEx);
        if (match) {
          delete newValue[key];
          newValue[match[1]] = v;
        }
      }
      if (v === undefined || v === null) {
        delete newValue[key];
      } else {
        newValue[key] = graphQLToFHIR(v);
      }
    });
    return newValue;
  }

  return value;
};
