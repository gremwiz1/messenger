export function queryStringify(data: XMLHttpRequestBodyInit) {
  return `?${Object.entries(data)
    .map((obj) => `${obj[0]}=${obj[1]}`)
    .join("&")}`;
}
