export const enum Method {
	Get = 'Get',
	Post = 'Post',
	Put = 'Put',
	Patch = 'Patch',
	Delete = 'Delete',
}

type RequestOptions = {
	headers?: Record<string, string>;
	method?: Method;
	timeout?: number;
	data?: any;
};

type HTTPMethod = (url: string, options?: RequestOptions) => Promise<unknown>;

export class HTTPTransport {
	get: HTTPMethod = (url, options = {}) =>
		this.request(url, { ...options, method: Method.Get });

	post: HTTPMethod = (url, options = {}) =>
		this.request(url, { ...options, method: Method.Post });

	put: HTTPMethod = (url, options = {}) =>
		this.request(url, { ...options, method: Method.Put });

	delete: HTTPMethod = (url, options = {}) =>
		this.request(url, { ...options, method: Method.Delete });

	request = (url: string, options: RequestOptions = {}) => {
		const { headers = {}, method, data } = options;
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();

			if (!method) {
				reject('No method');
				return;
			}

			const isGet = method === Method.Get;

			xhr.open(method, url);

			Object.keys(headers).forEach((key) => {
				xhr.setRequestHeader(key, headers[key]);
			});

			xhr.onload = () => {
				resolve(xhr);
			};

			xhr.onabort = reject;
			xhr.onerror = reject;

			xhr.timeout = options.timeout || 5000;
			xhr.ontimeout = reject;

			if (isGet || !data) {
				xhr.send();
			} else {
				xhr.send(JSON.stringify(data));
			}
		});
	};
}
