"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { StorageService } from "@/services/storage.service";
import { IProduct } from "@/types";
import useQuantityControl from "@/hooks/products/[id]/useQuantityControl";
import QuantitySelector from "./QuantitySelector";
import ActionButtons from "./ActionButtons";

const ProductInteractiveSection: React.FC<{ product: IProduct }> = ({
	product,
}) => {
	const router = useRouter();
	const { calculateTotal } = useQuantityControl(product);

	const handleAddToCart = () => {
		StorageService.addToCart({
			id: product.id,
			name: product.name,
			price: product.price,
			image: product.image,
			quantity: 1,
		});
		router.push("/cart");
	};

	return (
		<>
			<QuantitySelector
				total={parseFloat(calculateTotal())}
			/>
			<ActionButtons onAddToCart={handleAddToCart} product={product} />
		</>
	);
};

export default ProductInteractiveSection;