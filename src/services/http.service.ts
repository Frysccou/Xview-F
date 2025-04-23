import { StorageService } from "./storage.service";
import { RequestOptions } from "@/types";

export const HttpService = {
	request: async <T>(
		url: string,
		options: RequestOptions = {}
	): Promise<T> => {
		const { method = "GET", headers = {}, body } = options;

		const token = StorageService.getToken();

		const requestOptions: RequestInit = {
			method,
			headers: {
				"Content-Type": "application/json",
				...(token ? { Authorization: token } : {}),
				...headers,
			},
			...(body ? { body: JSON.stringify(body) } : {}),
			cache: "no-store"
		};

		const response = await fetch(url, requestOptions);

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}));
			throw new Error(
				errorData.message || `Error en la petición: ${response.status}`
			);
		}

		if (response.status === 204) {
			return {} as T;
		}

		return response.json();
	},

	get: <T>(url: string, headers = {}): Promise<T> => {
		return HttpService.request<T>(url, { headers });
	},

	post: <T>(url: string, body: Record<string, unknown>, headers = {}): Promise<T> => {
		return HttpService.request<T>(url, { method: "POST", body, headers });
	},

	put: <T>(url: string, body: Record<string, unknown>, headers = {}): Promise<T> => {
		return HttpService.request<T>(url, { method: "PUT", body, headers });
	},

	patch: <T>(url: string, body: Record<string, unknown>, headers = {}): Promise<T> => {
		return HttpService.request<T>(url, { method: "PATCH", body, headers });
	},

	delete: <T>(url: string, headers = {}): Promise<T> => {
		return HttpService.request<T>(url, { method: "DELETE", headers });
	},
};