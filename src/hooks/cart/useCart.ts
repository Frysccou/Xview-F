import { useState, useEffect } from "react";
import { StorageService } from "@/services/storage.service";
import { CartItem } from "@/types";
import { showToast } from "@/components/ui/Toast";

const useCart = () => {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);

	useEffect(() => {
		const items = StorageService.getCart();
		const itemsWithFixedQuantity = items.map((item) => ({
			...item,
			quantity: 1,
		}));
		setCartItems(itemsWithFixedQuantity);
	}, []);

	const removeItem = (id: number) => {
		StorageService.removeFromCart(id);
		const updatedItems = cartItems.filter((item) => item.id !== id);
		setCartItems(updatedItems);
		showToast({
			message: "Producto eliminado del carrito",
			type: "info",
		});
	};

	const clearCart = () => {
		StorageService.clearCart();
		setCartItems([]);
		showToast({
			message: "Carrito vaciado correctamente",
			type: "info",
		});
	};

	const calculateTotal = () => {
		return cartItems.reduce(
			(total, item) => total + (Number(item.price) || 0),
			0
		);
	};

	return {
		cartItems,
		setCartItems,
		removeItem,
		clearCart,
		calculateTotal,
	};
};

export default useCart;
