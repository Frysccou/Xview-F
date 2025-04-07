import { useState, useEffect, useCallback } from "react";
import { ApiService } from "@/services/api.service";
import { IProduct } from "@/types";

export type SortOption = "relevancy" | "price-low-high" | "price-high-low";

export interface ProductFilters {
	categories: number[];
	genres: string[];
	searchQuery: string;
	sortOption: SortOption;
}

const useProductSearch = () => {
	const [allProducts, setAllProducts] = useState<IProduct[]>([]);
	const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
	const [paginatedProducts, setPaginatedProducts] = useState<IProduct[]>([]);
	const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
	const [genres, setGenres] = useState<string[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [filters, setFilters] = useState<ProductFilters>({
		categories: [],
		genres: [],
		searchQuery: "",
		sortOption: "relevancy",
	});
	const [pagination, setPagination] = useState({
		currentPage: 1,
		itemsPerPage: 6,
		totalPages: 1
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				
				const productsData = await ApiService.getProducts();
				
				setAllProducts(productsData);
				setFilteredProducts(productsData);
				setPagination(prev => ({
					...prev,
					totalPages: Math.ceil(productsData.length / prev.itemsPerPage)
				}));
				
				const categoryMap = new Map<number, string>();
				const categoryNames: Record<number, string> = {
					1: "Shonen",
					2: "Seinen",
					3: "Shojo",
				};
				
				productsData.forEach(product => {
					if (product.categoryId && !categoryMap.has(product.categoryId)) {
						const name = categoryNames[product.categoryId] || `Categoría ${product.categoryId}`;
						categoryMap.set(product.categoryId, name);
					}
				});
				
				const extractedCategories = Array.from(categoryMap).map(([id, name]) => ({ id: Number(id), name }));
				setCategories(extractedCategories);
				
				const uniqueGenres = new Set<string>();
				
				productsData.forEach(product => {
					if (product.genres) {
						let productGenres: string[] = [];
						
						try {
							if (Array.isArray(product.genres)) {
								productGenres = product.genres;
							} else if (typeof product.genres === "string") {
								productGenres = JSON.parse(product.genres);
							}
						} catch (error) {
							if (typeof product.genres === "string") {
								productGenres = product.genres.split(',').map(g => g.trim());
							}
						}
						
						productGenres.forEach(genre => uniqueGenres.add(genre));
					}
				});
				
				setGenres(Array.from(uniqueGenres).sort());
			} catch (error) {
				setError("Error al cargar los datos");
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		if (!allProducts.length) return;

		let result = [...allProducts];

		if (filters.searchQuery) {
			const query = filters.searchQuery.toLowerCase();
			result = result.filter((product) =>
				product.name.toLowerCase().includes(query)
			);
		}

		if (filters.categories.length > 0) {
			result = result.filter((product) =>
				filters.categories.includes(product.categoryId)
			);
		}

		if (filters.genres.length > 0) {
			result = result.filter((product) => {
				if (!product.genres) return false;

				let productGenres: string[] = [];
				try {
					if (Array.isArray(product.genres)) {
						productGenres = product.genres;
					} else if (typeof product.genres === "string") {
						productGenres = JSON.parse(product.genres);
					}
				} catch (error) {
					if (typeof product.genres === "string") {
						productGenres = product.genres.split(',').map(g => g.trim());
					}
				}

				return filters.genres.some((genre) =>
					productGenres.includes(genre)
				);
			});
		}

		if (filters.sortOption !== "relevancy") {
			result.sort((a, b) => {
				if (filters.sortOption === "price-low-high") {
					return a.price - b.price;
				} else {
					return b.price - a.price;
				}
			});
		}

		setFilteredProducts(result);
		setPagination(prev => ({
			...prev,
			currentPage: 1,
			totalPages: Math.ceil(result.length / prev.itemsPerPage)
		}));
	}, [allProducts, filters]);

	useEffect(() => {
		const { currentPage, itemsPerPage } = pagination;
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		setPaginatedProducts(filteredProducts.slice(startIndex, endIndex));
	}, [filteredProducts, pagination]);

	const updateSearchQuery = useCallback((query: string) => {
		setFilters(prev => ({ ...prev, searchQuery: query }));
	}, []);

	const updateFilters = useCallback((newFilters: {
		categories: number[];
		genres: string[];
	}) => {
		setFilters(prev => ({ 
			...prev, 
			categories: newFilters.categories,
			genres: newFilters.genres 
		}));
	}, []);

	const updateSortOption = useCallback((option: SortOption) => {
		setFilters(prev => ({ ...prev, sortOption: option }));
	}, []);

	const resetFilters = useCallback(() => {
		setFilters({
			categories: [],
			genres: [],
			searchQuery: "",
			sortOption: "relevancy",
		});
	}, []);

	const goToNextPage = useCallback(() => {
		setPagination(prev => ({
			...prev,
			currentPage: Math.min(prev.currentPage + 1, prev.totalPages)
		}));
	}, []);

	const goToPrevPage = useCallback(() => {
		setPagination(prev => ({
			...prev,
			currentPage: Math.max(prev.currentPage - 1, 1)
		}));
	}, []);

	return {
		products: filteredProducts,
		paginatedProducts,
		allProducts,
		categories,
		genres,
		loading,
		error,
		filters,
		pagination,
		updateSearchQuery,
		updateFilters,
		updateSortOption,
		resetFilters,
		goToNextPage,
		goToPrevPage
	};
};

export default useProductSearch;
