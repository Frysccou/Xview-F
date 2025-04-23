import {
	CreateOrderData,
	IOrder,
	IProduct,
	IUser,
	LoginData,
	LoginResponse,
	RegisterData,
} from "../types";
import { HttpService } from "./http.service";
import { StorageService } from "./storage.service";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const ApiService = {
	login: async (data: LoginData): Promise<LoginResponse> => {
		const response = await HttpService.post<LoginResponse>(
			`${API_URL}/users/login`,
			data
		);
		if (response.token) {
			StorageService.setToken(response.token);
			StorageService.setUserData(response.user);
		}
		return response;
	},

	register: async (data: RegisterData): Promise<IUser> => {
		return await HttpService.post<IUser>(`${API_URL}/users/register`, data);
	},

	getCurrentUser: async (): Promise<IUser | null> => {
		const userData = StorageService.getUserData();
		return userData as IUser;
	},

	getProducts: async (): Promise<IProduct[]> => {
		const response = await HttpService.get<IProduct[]>(
			`${API_URL}/products`
		);
		return Array.isArray(response) ? response : [];
	},

	createOrder: async (data: CreateOrderData): Promise<IOrder> => {
		const token = StorageService.getToken();
		if (!token) throw new Error("Usuario no autenticado");

		const orderData = {
			products: data.products.map((product) => product.id),
		};

		return await HttpService.post<IOrder>(`${API_URL}/orders`, orderData);
	},

	getUserOrders: async (): Promise<IOrder[]> => {
		const token = StorageService.getToken();
		if (!token) throw new Error("Usuario no autenticado");

		const orders = await HttpService.get<IOrder[]>(
			`${API_URL}/users/orders`
		);
		return Array.isArray(orders)
			? orders.sort(
					(a, b) =>
						new Date(b.date).getTime() - new Date(a.date).getTime()
			)
			: [];
	},

	logout: (): void => {
		StorageService.clearSession();
		StorageService.clearCart();
	},
};
