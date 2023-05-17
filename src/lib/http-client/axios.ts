import axios, { AxiosResponseHeaders, RawAxiosResponseHeaders } from "axios";
import http, { IncomingHttpHeaders } from "http";
import https from "https";
import { HttpError } from "./http-error";

const httpAgent = new http.Agent({ keepAlive: true, keepAliveMsecs: 60 })
const httpsAgent = new https.Agent({ keepAlive: true, keepAliveMsecs: 60 })

export namespace Http {
	export type Method = "GET" | "DELETE" | "HEAD" | "OPTIONS" | "POST" | "PUT" | "PATCH";

	export interface Client {
		request: <T, R = any>(params: Params<T> & { method: Http.Method }) => Promise<Response<R>>
		get: <T, R = any>(params: Params<T>) => Promise<Response<R>>
		post: <T, R = any>(params: Params<T>) => Promise<Response<R>>
		put: <T, R = any>(params: Params<T>) => Promise<Response<R>>
		patch: <T, R = any>(params: Params<T>) => Promise<Response<R>>
		delete: <T, R = any>(params: Params<T>) => Promise<Response<R>>
		head: <T, R = any>(params: Params<T>) => Promise<Response<R>>
		options: <T, R = any>(params: Params<T>) => Promise<Response<R>>
	}

	export interface Params<T> {
		url: string;
		data?: T;
		params?: URLSearchParams;
		headers?: IncomingHttpHeaders
	}

	export interface Response<T> {
		statusCode: number;
		headers?: RawAxiosResponseHeaders | AxiosResponseHeaders;
		data: T;
	}
}

export class HttpClient implements Http.Client {
	constructor(private readonly baseUrl: string | undefined = undefined) {}

	async get<T, R = any>(params: Http.Params<T>): Promise<Http.Response<R>> {
		return this.request({ method: 'GET', ...params })
	}

	async post<T, R = any>(params: Http.Params<T>): Promise<Http.Response<R>> {
		return this.request<T, R>({ method: 'POST', ...params })
	}

	async put<T, R = any>(params: Http.Params<T>): Promise<Http.Response<R>> {
		return this.request<T, R>({ method: 'PUT', ...params })
	}

	async patch<T, R = any>(params: Http.Params<T>): Promise<Http.Response<R>> {
		return this.request<T, R>({ method: 'PATCH', ...params })
	}

	async delete<T, R = any>(params: Http.Params<T>): Promise<Http.Response<R>> {
		return this.request<T, R>({ method: 'DELETE', ...params })
	}

	async options<T, R = any>(params: Http.Params<T>): Promise<Http.Response<R>> {
		return this.request<T, R>({ method: 'OPTIONS', ...params })
	}

	async head<T, R = any>(params: Http.Params<T>): Promise<Http.Response<R>> {
		return this.request<T, R>({ method: 'HEAD', ...params })
	}

	async request<T = any, R = any>({
		method,
		url,
		data,
		params,
		headers = {}
	}: Http.Params<T> & { method: Http.Method }): Promise<Http.Response<R>> {
		if (method.toUpperCase() === "GET") {
			data = undefined;
		}

		try {
			const { data: response, status, headers: responseHeaders } = await axios.request<R>({
				baseURL: this.stripTrailslash(this.baseUrl),
				method,
				url: this.appendHeadslash(url),
				data,
				headers,
				httpAgent,
				httpsAgent,
				params
			})

			return {
				statusCode: status,
				data: response,
				headers: responseHeaders,
			}
		} catch(e) {
			throw HttpError.handle(e)
		}
	}

	private stripTrailslash(url?: string): string | undefined {
		if (!url) return url;

		if (url.at(-1) === "/" && url.length > 1) {
			return url.substring(0, url.length - 2)
		}

		return url
	}

	private appendHeadslash(url: string): string {
		if (url.at(0) === "/" || !url) {
			return url
		}

		return `/${url}`
	}
}
