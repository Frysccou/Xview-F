"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/ui/Sidebar";
import useUserData from "@/hooks/dashboard/useUserData";
import useOrders from "@/hooks/dashboard/[orders]/useOrders";
import useTabNavigation from "@/hooks/dashboard/useTabNavigation";
import LoadingSpinner from "@/components/dashboard/LoadingSpinner";
import OrdersList from "@/components/dashboard/[orders]/OrdersList";
import OrdersFilter from "@/components/dashboard/[orders]/OrdersFilter";

export default function OrdersPage() {
	const { activeTab, setActiveTab } = useTabNavigation("orders");
	const { user, loading } = useUserData();
	const { orders, isLoading, sortOrdersByDate } = useOrders();
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
	const router = useRouter();

	const handleSortChange = () => {
		const newDirection = sortDirection === "desc" ? "asc" : "desc";
		setSortDirection(newDirection);
		sortOrdersByDate(newDirection);
	};

	if (loading || isLoading) {
		return <LoadingSpinner />;
	}

	if (!user) {
		router.push("/login");
		return null;
	}

	return (
		<div className="flex flex-col items-center px-4 py-8 min-h-screen sm:px-6 lg:px-8">
			<h1 className="mb-6 text-3xl font-bold text-center text-white">
				<span className="text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[var(--pastel-purple)] to-[var(--pastel-salmon)]">
					Mi Perfil
				</span>
			</h1>

			<Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

			<div className="w-full max-w-4xl">
				<OrdersFilter
					sortDirection={sortDirection}
					onSortChange={handleSortChange}
				/>

				<OrdersList orders={orders} />
			</div>
		</div>
	);
}