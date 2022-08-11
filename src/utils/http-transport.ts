import { queryStringify } from "./query-stringify";

enum Methods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
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
