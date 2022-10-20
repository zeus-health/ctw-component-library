// @todo: This is a polyfill for the react-router-dom function used in remix.
//    We don't want to be prescriptive about builders search params, so there
//    really is no need for this and it should be removed soon.
export function useSearchParams(): [URLSearchParams, () => void] {
  const searchParams = new URLSearchParams(document.location.search);

  const setSearchParams = (newParams = {}) => {
    const { location } = document;
    const params = new URLSearchParams(location.search);

    if (params.toString() !== newParams.toString()) {
      window.history.replaceState({}, "", `${location.pathname}?${newParams}`);
    }
  };

  return [searchParams, setSearchParams];
}
