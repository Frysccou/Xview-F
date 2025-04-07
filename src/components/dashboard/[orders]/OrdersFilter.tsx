import React from "react";

interface OrdersFilterProps {
	sortDirection: "asc" | "desc";
	onSortChange: () => void;
}

const OrdersFilter = ({ sortDirection, onSortChange }: OrdersFilterProps) => {
	return (
		<div className="flex justify-end mb-4">
			<button
				onClick={onSortChange}
				className="px-4 py-2 text-white bg-white/10 border border-white/20 rounded-md hover:bg-white/20 transition-colors flex items-center"
			>
				<span>Ordenar por fecha: </span>
				<span className="ml-2 font-medium">
					{sortDirection === "desc"
						? "Más recientes primero"
						: "Más antiguos primero"}
				</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="ml-2 h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					{sortDirection === "desc" ? (
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
						/>
					) : (
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
						/>
					)}
				</svg>
			</button>
		</div>
	);
};

export default OrdersFilter;
