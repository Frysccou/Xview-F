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
	paginatedCartItems: CartItem[];
	cartCurrentPage: number;
	cartTotalPages: number;
	goToCartPage: (page: number) => void;
	goToNextCartPage: () => void;
	goToPrevCartPage: () => void;
}

export const CartContext = createContext<CartContextType>({
	cartItems: [],
	cartCount: 0,
	addToCart: () => {},
	removeFromCart: () => {},
	clearCart: () => {},
	isInCart: () => false,
	calculateTotal: () => 0,
	paginatedCartItems: [],
	cartCurrentPage: 1,
	cartTotalPages: 1,
	goToCartPage: () => {},
	goToNextCartPage: () => {},
	goToPrevCartPage: () => {},
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [cartCount, setCartCount] = useState<number>(0);
	const { isAuthenticated } = useContext(AuthContext);

	const [cartCurrentPage, setCartCurrentPage] = useState<number>(1);
	const itemsPerPage = 4;
	const [cartTotalPages, setCartTotalPages] = useState<number>(1);
	const [paginatedCartItems, setPaginatedCartItems] = useState<CartItem[]>(
		[]
	);

	const loadCartItems = useCallback(() => {
		const token = StorageService.getToken();
		if (!token) {
			setCartItems([]);
			setCartCount(0);
			setCartCurrentPage(1);
			setCartTotalPages(1);
			setPaginatedCartItems([]);
			return;
		}
		const items = StorageService.getCart();
		setCartItems(items);
		setCartCount(items.length);
		setCartTotalPages(Math.ceil(items.length / itemsPerPage));
		setCartCurrentPage(1);
	}, []);

	useEffect(() => {
		loadCartItems();
	}, [loadCartItems, isAuthenticated]);

	useEffect(() => {
		const startIndex = (cartCurrentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		setPaginatedCartItems(cartItems.slice(startIndex, endIndex));
		setCartTotalPages(Math.ceil(cartItems.length / itemsPerPage));
	}, [cartItems, cartCurrentPage, itemsPerPage]);

	const goToCartPage = useCallback(
		(page: number) => {
			setCartCurrentPage(Math.max(1, Math.min(page, cartTotalPages)));
		},
		[cartTotalPages]
	);

	const goToNextCartPage = useCallback(() => {
		setCartCurrentPage((prev) => Math.min(prev + 1, cartTotalPages));
	}, [cartTotalPages]);

	const goToPrevCartPage = useCallback(() => {
		setCartCurrentPage((prev) => Math.max(prev - 1, 1));
	}, []);

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
		const newTotalPages = Math.ceil((cartItems.length - 1) / itemsPerPage);
		if (cartCurrentPage > newTotalPages && newTotalPages > 0) {
			setCartCurrentPage(newTotalPages);
		} else if (cartItems.length - 1 === 0) {
			setCartCurrentPage(1);
		}
	};

	const clearCart = () => {
		StorageService.clearCart();
		loadCartItems();
		showToast({
			message: "Carrito vaciado correctamente",
			type: "info",
		});
		setCartCurrentPage(1);
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
				paginatedCartItems,
				cartCurrentPage,
				cartTotalPages,
				goToCartPage,
				goToNextCartPage,
				goToPrevCartPage,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
