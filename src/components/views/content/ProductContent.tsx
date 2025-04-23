"use client";

import React from "react";
import SearchBar from "@/components/products/SearchBar";
import ProductGrid from "@/components/products/ProductGrid";
import LoadingSpinner from "@/components/products/LoadingSpinner";
import ErrorDisplay from "@/components/products/ErrorDisplay";
import CatalogHeader from "@/components/products/CatalogHeader";
import useProductSearch from "@/hooks/products/useProductSearch";
import useCart from "@/hooks/products/useCart";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductContent() {
	const {
		paginatedProducts,
		categories,
		genres,
		loading,
		error,
		pagination,
		updateSearchQuery,
		updateFilters,
		updateSortOption,
		updatePriceRange,
		goToNextPage,
		goToPrevPage,
	} = useProductSearch();
	const { handleQuickAddToCart } = useCart();

	if (loading) return <LoadingSpinner />;
	if (error) return <ErrorDisplay message={error} />;

	return (
		<div className="container mx-auto py-8 px-4">
			<CatalogHeader />

			<SearchBar
				onSearch={updateSearchQuery}
				onFilter={updateFilters}
				onSort={updateSortOption}
				onPriceRangeChange={updatePriceRange}
				categories={categories}
				genres={genres}
			/>

			<div className="mt-20">
				{paginatedProducts.length > 0 ? (
					<>
						<ProductGrid
							products={paginatedProducts}
							onAddToCart={handleQuickAddToCart}
						/>

						{pagination.totalPages > 1 && (
							<div className="flex justify-center items-center mt-6">
								<button
									onClick={goToPrevPage}
									disabled={pagination.currentPage === 1}
									className={`p-2 rounded-full ${
										pagination.currentPage === 1
											? "text-gray-500 cursor-not-allowed"
											: "text-white hover:bg-white/10"
									}`}
								>
									<ChevronLeft size={20} />
								</button>
								<div className="mx-4 text-sm">
									<span className="bg-gradient-to-r from-[var(--pastel-purple)] to-[var(--pastel-salmon)] bg-clip-text text-transparent font-medium">
										{pagination.currentPage}
									</span>{" "}
									<span className="text-gray-400">
										de {pagination.totalPages}
									</span>
								</div>
								<button
									onClick={goToNextPage}
									disabled={
										pagination.currentPage ===
										pagination.totalPages
									}
									className={`p-2 rounded-full ${
										pagination.currentPage ===
										pagination.totalPages
											? "text-gray-500 cursor-not-allowed"
											: "text-white hover:bg-white/10"
									}`}
								>
									<ChevronRight size={20} />
								</button>
							</div>
						)}
					</>
				) : (
					<div className="text-center py-10">
						<p className="text-white text-lg">
							No hay productos disponibles
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
