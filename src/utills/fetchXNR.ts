export enum Method {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	PATCH = 'PATCH',
	DELETE = 'DELETE',
}

type RequestOptions = {
	headers?: Record<string, string>;
	method?: Method;
	timeout?: number;
	data?: any;
};

type OptionsWithoutMethod = (url: string, options?: RequestOptions) => Promise<unknown>;

export class HTTPTransport {
	get: OptionsWithoutMethod = (url, options = {}) =>
		this.request(url, { ...options, method: Method.GET });

	post: OptionsWithoutMethod = (url, options = {}) =>
		this.request(url, { ...options, method: Method.POST });

	put: OptionsWithoutMethod = (url, options = {}) =>
		this.request(url, { ...options, method: Method.PUT });

	delete: OptionsWithoutMethod = (url, options = {}) =>
		this.request(url, { ...options, method: Method.DELETE });

	request = (url: string, options: RequestOptions = {}) => {
		const { headers = {}, method, data } = options;
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();

			if (!method) {
				reject('No method');
				return;
			}

			const isGet = method === Method.GET;

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
