import { useState, useEffect } from "react";
import { ApiService } from "@/services/api.service";
import { IProduct } from "@/types";

const useProducts = () => {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				setLoading(true);
				const productsData = await ApiService.getProducts();
				setProducts(productsData);
			} catch (err) {
				setError("Error al cargar los productos");
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, []);

	return { products, loading, error };
};

export default useProducts;
