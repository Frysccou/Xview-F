"use client";

import React, { useState } from "react";
import CartItemList from "@/components/cart/CartItemList";
import CartSummary from "@/components/cart/CartSummary";
import EmptyCart from "@/components/cart/EmptyCart";
import CheckoutForm from "@/components/cart/CheckoutForm";
import useCart from "@/hooks/useCart";
import useCheckout from "@/hooks/cart/useCheckout";
import { CartItem } from "@/types";

interface CartViewProps {
	showTitle?: boolean;
}

const CartContent: React.FC<CartViewProps> = ({ showTitle = false }) => {
	const { cartItems, removeFromCart, clearCart, calculateTotal } = useCart();
	const [localCartItems, setLocalCartItems] = useState<CartItem[]>(cartItems);

	const {
		showCheckout,
		paymentInfo,
		formErrors,
		handleInputChange,
		proceedToCheckout,
		handlePaymentSubmit,
	} = useCheckout();

	return (
		<>
			{showTitle && (
				<h1 className="mb-6 text-3xl font-bold text-center text-white">
					<span className="text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[var(--pastel-purple)] to-[var(--pastel-salmon)]">
						{cartItems.length > 0
							? "Tu Carrito"
							: "Carrito de Compras Vacío"}
					</span>
				</h1>
			)}

			{cartItems.length > 0 ? (
				<div className="w-full max-w-3xl">
					<div className="p-6 mb-8 glass-effect">
						<CartItemList
							items={cartItems}
							onRemoveItem={removeFromCart}
						/>
						<CartSummary
							total={calculateTotal()}
							onClearCart={clearCart}
							onCheckout={proceedToCheckout}
						/>
					</div>

					{showCheckout && (
						<CheckoutForm
							paymentInfo={paymentInfo}
							formErrors={formErrors}
							onInputChange={handleInputChange}
							onSubmit={handlePaymentSubmit}
						/>
					)}
				</div>
			) : (
				<EmptyCart />
			)}
		</>
	);
};

export default CartContent;
