import { useState, useEffect } from "react";
import { ApiService } from "@/services/api.service";
import { IProduct } from "@/types";

const useFeaturedProducts = (limit: number = 5) => {
	const [featuredMangas, setFeaturedMangas] = useState<IProduct[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const products = await ApiService.getProducts();
				setFeaturedMangas(products.slice(0, limit));
			} catch {
				setError("No se pudieron cargar los productos");
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, [limit]);

	return { featuredMangas, loading, error };
};

export default useFeaturedProducts;
