import { useState } from "react";
import { IProduct } from "@/types";

const useQuantityControl = (product: IProduct | null) => {
	const [quantity] = useState(1);

	const increaseQuantity = () => {
		return;
	};

	const decreaseQuantity = () => {
		return;
	};

	const calculateTotal = () => {
		if (!product) return "0.00";
		return (product.price * 1).toFixed(2);
	};

	return {
		quantity,
		increaseQuantity,
		decreaseQuantity,
		calculateTotal,
	};
};

export default useQuantityControl;
