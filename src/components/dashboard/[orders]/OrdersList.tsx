import React from "react";
import { IOrder } from "@/types";
import Image from "next/image";

interface OrdersListProps {
	orders: IOrder[];
}

const OrdersList = ({ orders }: OrdersListProps) => {
	if (orders.length === 0) {
		return (
			<div className="p-6 glass-effect">
				<div className="p-4 text-center text-white/70 rounded-md border bg-white/5 border-white/10">
					No hay historial de compras
				</div>
			</div>
		);
	}

	const formatDate = (dateString: Date) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("es-ES", {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const getStatusBadgeClass = (status: string) => {
		switch (status.toLowerCase()) {
			case "approved":
				return "bg-green-500/20 text-green-300 border-green-500/30";
			case "pending":
				return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
			case "rejected":
				return "bg-red-500/20 text-red-300 border-red-500/30";
			default:
				return "bg-gray-500/20 text-gray-300 border-gray-500/30";
		}
	};

	const getStatusText = (status: string) => {
		switch (status.toLowerCase()) {
			case "approved":
				return "Aprobada";
			case "pending":
				return "Pendiente";
			case "rejected":
				return "Rechazada";
			default:
				return status;
		}
	};

	return (
		<div className="space-y-6">
			{orders.map((order) => (
				<div key={order.id} className="p-6 glass-effect">
					<div className="flex justify-between items-center mb-4">
						<h3 className="text-xl font-semibold text-white">
							Orden #{order.id}
						</h3>
						<span
							className={`px-3 py-1 text-sm rounded-full border ${getStatusBadgeClass(
								order.status
							)}`}
						>
							{getStatusText(order.status)}
						</span>
					</div>

					<div className="mb-4 text-white/70">
						<p>Fecha: {formatDate(order.date)}</p>
					</div>

					<div className="mt-4">
						<h4 className="mb-2 text-lg font-medium text-white">
							Productos:
						</h4>
						<div className="space-y-3">
							{order.products.map((product) => {
								const quantity =
									order.productQuantities?.[product.id] || 1;
								return (
									<div
										key={product.id}
										className="flex justify-between items-center p-3 rounded-md bg-white/5 border border-white/10"
									>
										<div className="flex items-center">
											{product.image && (
												<Image
													src={product.image}
													alt={product.name}
													width={48}
													height={48}
													className="w-12 h-12 object-cover rounded-md mr-3"
												/>
											)}
											<div>
												<p className="text-white">
													{product.name}
												</p>
												<p className="text-white/70">
													Cantidad: {quantity}
												</p>
											</div>
										</div>
										<p className="text-white font-medium">
											$
											{(product.price * quantity).toFixed(
												2
											)}
										</p>
									</div>
								);
							})}
						</div>
					</div>

					<div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
						<p className="text-xl font-bold text-white">
							Total: $
							{order.products
								.reduce((sum, product) => {
									const quantity =
										order.productQuantities?.[product.id] ||
										1;
									return sum + product.price * quantity;
								}, 0)
								.toFixed(2)}
						</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default OrdersList;
