import { useState, useEffect } from "react";
import { ApiService } from "@/services/api.service";
import { IOrder } from "@/types";

const useOrders = () => {
	const [orders, setOrders] = useState<IOrder[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const userOrders = await ApiService.getUserOrders();
				setOrders(userOrders);
			} catch (error) {
				console.error("Error fetching orders:", error);
				setError("Error al cargar las órdenes");
			} finally {
				setIsLoading(false);
			}
		};

		fetchOrders();
	}, []);

	const sortOrdersByDate = (direction: "asc" | "desc") => {
		const sortedOrders = [...orders].sort((a, b) => {
			const dateA = new Date(a.date).getTime();
			const dateB = new Date(b.date).getTime();
			return direction === "asc" ? dateA - dateB : dateB - dateA;
		});
		setOrders(sortedOrders);
	};

	return { orders, isLoading, error, sortOrdersByDate };
};

export default useOrders;
