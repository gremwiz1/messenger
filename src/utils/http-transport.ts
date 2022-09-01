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
  data?: string | FormData;
  contentType?: string;
}

export class HTTPTransport {
  baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  get = (url: string, options: IOptions = {}) =>
    this.request(
      `${this.baseUrl}${url}`,
      { ...options, method: Methods.GET },
      options.timeout
    );

  post = (url: string, options: IOptions = {}) =>
    this.request(
      `${this.baseUrl}${url}`,
      { ...options, method: Methods.POST },
      options.timeout
    );

  put = (url: string, options: IOptions = {}) =>
    this.request(
      `${this.baseUrl}${url}`,
      { ...options, method: Methods.PUT },
      options.timeout
    );

  delete = (url: string, options: IOptions = {}) =>
    this.request(
      `${this.baseUrl}${url}`,
      { ...options, method: Methods.DELETE },
      options.timeout
    );

  request = (
    url: string,
    options: IOptions = { method: Methods.GET },
    timeout = 5000
  ) => {
    const { method, contentType = "application/json" } = options;
    let data = options.data;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(
        method as string,
        method === Methods.GET && !!data ? url + queryStringify(data) : url
      );
      xhr.withCredentials = true;
      xhr.setRequestHeader("credentials", "include");
      xhr.setRequestHeader("mode", "cors");
      if (data && !(data instanceof FormData)) {
        xhr.setRequestHeader("content-type", contentType);
        data = JSON.stringify(data);
      }
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
        xhr.send(data);
      }
    });
  };
}
