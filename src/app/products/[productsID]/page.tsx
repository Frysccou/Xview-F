"use client";

import React, { useEffect, useState } from "react";
import { ApiService } from "@/services/api.service";
import ProductImageGallery from "@/components/products/[id]/ProductImageGallery";
import ProductHeader from "@/components/products/[id]/ProductHeader";
import ProductPricing from "@/components/products/[id]/ProductPricing";
import ProductDescription from "@/components/products/[id]/ProductDescription";
import ProductInteractiveSection from "@/components/products/[id]/ProductInteractiveSection";
import RelatedProductsSection from "@/components/products/[id]/RelatedProductsSection";
import LoadingSpinner from "@/components/products/LoadingSpinner";
import { IProduct } from "@/types";

export default function Details({
	params,
}: {
	params: { productsID: string };
}) {
	const [product, setProduct] = useState<IProduct | null>(null);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const productId = Number(params.productsID);
				const allProducts = await ApiService.getProducts();
				const foundProduct =
					allProducts.find((p) => p.id === productId) || null;
				setProduct(foundProduct);
				if (!foundProduct) {
					setError("Producto no encontrado");
				}
			} catch (err) {
				setError("Error al cargar el producto");
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchProduct();
	}, [params.productsID]);

	if (loading) {
		return <LoadingSpinner />;
	}

	if (!product) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<div className="text-white text-xl">
					{error || "Producto no encontrado"}
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center px-4 py-8 min-h-screen sm:px-6 lg:px-8">
			<div className="w-full max-w-6xl">
				<div className="flex flex-col mb-12 md:flex-row md:gap-8">
					<ProductImageGallery product={product} />

					<div className="flex flex-col md:w-1/2">
						<ProductHeader product={product} />
						<ProductPricing product={product} />
						<ProductDescription product={product} />
						<ProductInteractiveSection product={product} />
					</div>
				</div>

				<RelatedProductsSection />
			</div>
		</div>
	);
}
