export const base64toBlob = (data: string, type = "application/pdf") => {
  const bytes = atob(data);
  let { length } = data;
  const out = new Uint8Array(length);

  while (length) {
    length -= 1;
    out[length] = bytes.charCodeAt(length);
  }

  return new Blob([out], { type });
};
