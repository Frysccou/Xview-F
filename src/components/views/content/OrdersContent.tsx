"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/ui/Sidebar";
import useUserData from "@/hooks/dashboard/useUserData";
import useOrders from "@/hooks/dashboard/[orders]/useOrders";
import useTabNavigation from "@/hooks/dashboard/useTabNavigation";
import LoadingSpinner from "@/components/dashboard/LoadingSpinner";
import OrdersList from "@/components/dashboard/[orders]/OrdersList";
import OrdersFilter from "@/components/dashboard/[orders]/OrdersFilter";

export default function OrdersContent() {
	const { activeTab, setActiveTab } = useTabNavigation("orders");
	const { user, loading: userLoading } = useUserData();
	const {
		orders,
		isLoading: ordersLoading,
		searchQuery,
		sortOption,
		priceRange,
		updateSearchQuery,
		updateSortOption,
		updatePriceRange,
		error,
	} = useOrders();
	const router = useRouter();

	if (userLoading || ordersLoading) {
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
					searchQuery={searchQuery}
					sortOption={sortOption}
					priceRange={priceRange}
					onSearchChange={updateSearchQuery}
					onSortChange={updateSortOption}
					onPriceRangeChange={updatePriceRange}
				/>
				{error && (
					<div className="p-4 mb-4 text-center text-red-300 bg-red-500/20 rounded-md border border-red-500/30">
						{error}
					</div>
				)}
				<OrdersList orders={orders} />
			</div>
		</div>
	);
}
