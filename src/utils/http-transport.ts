enum Methods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

/**
 * Функцию реализовывать здесь необязательно, но может помочь не плодить логику у GET-метода
 * На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
 * На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
 */
function queryStringify(data: XMLHttpRequestBodyInit) {
  return `?${Object.entries(data)
    .map((obj) => `${obj[0]}=${obj[1]}`)
    .join("&")}`;
}

interface IOptions {
  method?: Methods;
  timeout?: number;
  headers?: Record<string, string>;
  data?: XMLHttpRequestBodyInit;
}

export class HTTPTransport {
  get = (url: string, options: IOptions = {}) =>
    this.request(url, { ...options, method: Methods.GET }, options.timeout);

  post = (url: string, options: IOptions = {}) =>
    this.request(url, { ...options, method: Methods.POST }, options.timeout);

  put = (url: string, options: IOptions = {}) =>
    this.request(url, { ...options, method: Methods.PUT }, options.timeout);

  delete = (url: string, options: IOptions = {}) =>
    this.request(url, { ...options, method: Methods.DELETE }, options.timeout);

  request = (
    url: string,
    options: IOptions = { method: Methods.GET },
    timeout = 5000
  ) => {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(
        method as string,
        method === Methods.GET && !!data ? url + queryStringify(data) : url
      );

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;
      xhr.timeout = timeout;

      if (method === Methods.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data as XMLHttpRequestBodyInit);
      }
    });
  };
}
