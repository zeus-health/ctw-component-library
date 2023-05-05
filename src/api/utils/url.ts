import { omitBy } from "@/utils/nodash";

export const constructJSONUrl = (
  baseUrl: URL,
  extraParams: Record<string, string>,
  count: number,
  offset: number
) => {
  const paramsObj = omitBy(
    {
      "page[count]": String(count),
      "page[offset]": offset ? String(offset + count) : String(offset),
      ...extraParams,
    },
    (value) => !value
  );

  const params = new URLSearchParams([...Object.entries(paramsObj)]).toString();
  return new URL(`${baseUrl}${decodeURIComponent(params)}`).href;
};
