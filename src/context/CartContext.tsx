"use client";

import React, {
	createContext,
	useState,
	useEffect,
	useCallback,
	useContext,
} from "react";
import { StorageService } from "@/services/storage.service";
import { CartItem } from "@/types";
import { showToast } from "@/components/ui/Toast";
import { AuthContext } from "./AuthContext";

export interface CartContextType {
	cartItems: CartItem[];
	cartCount: number;
	addToCart: (item: CartItem) => void;
	removeFromCart: (id: number) => void;
	clearCart: () => void;
	isInCart: (id: number) => boolean;
	calculateTotal: () => number;
}

export const CartContext = createContext<CartContextType>({
	cartItems: [],
	cartCount: 0,
	addToCart: () => {},
	removeFromCart: () => {},
	clearCart: () => {},
	isInCart: () => false,
	calculateTotal: () => 0,
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [cartCount, setCartCount] = useState<number>(0);
	const { isAuthenticated } = useContext(AuthContext);

	const loadCartItems = useCallback(() => {
		const token = StorageService.getToken();
		if (!token) {
			setCartItems([]);
			setCartCount(0);
			return;
		}
		const items = StorageService.getCart();
		setCartItems(items);
		setCartCount(items.length);
	}, []);

	useEffect(() => {
		loadCartItems();
	}, [loadCartItems, isAuthenticated]);

	const addToCart = (item: CartItem) => {
		if (!isInCart(item.id)) {
			StorageService.addToCart(item);
			loadCartItems();
			showToast({
				message: `${item.name} añadido al carrito`,
				type: "success",
			});
		}
	};

	const removeFromCart = (id: number) => {
		const itemToRemove = cartItems.find((item) => item.id === id);
		StorageService.removeFromCart(id);
		loadCartItems();
		showToast({
			message: itemToRemove
				? `${itemToRemove.name} eliminado del carrito`
				: "Producto eliminado del carrito",
			type: "info",
		});
	};

	const clearCart = () => {
		StorageService.clearCart();
		loadCartItems();
		showToast({
			message: "Carrito vaciado correctamente",
			type: "info",
		});
	};

	const isInCart = (id: number) => {
		return StorageService.isProductInCart(id);
	};

	const calculateTotal = () => {
		return cartItems.reduce(
			(total, item) => total + (Number(item.price) || 0),
			0
		);
	};

	return (
		<CartContext.Provider
			value={{
				cartItems,
				cartCount,
				addToCart,
				removeFromCart,
				clearCart,
				isInCart,
				calculateTotal,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
