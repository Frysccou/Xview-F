import { useState, useEffect } from "react";
import { ApiService } from "@/services/api.service";
import { IProduct } from "@/types";

const useProductDetails = (productId: number) => {
	const [product, setProduct] = useState<IProduct | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchProductDetails = async () => {
			try {
				const allProducts = await ApiService.getProducts();
				const foundProduct = allProducts.find(
					(p) => p.id === productId
				);

				if (foundProduct) {
					setProduct(foundProduct);
				}
			} catch {
				setError("Error al cargar el producto");
			} finally {
				setLoading(false);
			}
		};

		if (productId) {
			fetchProductDetails();
		}
	}, [productId]);

	return { product, loading, error };
};

export default useProductDetails;
