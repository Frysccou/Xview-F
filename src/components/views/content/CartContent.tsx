"use client";

import React from "react";
import CartItemList from "@/components/cart/CartItemList";
import CartSummary from "@/components/cart/CartSummary";
import EmptyCart from "@/components/cart/EmptyCart";
import CheckoutForm from "@/components/cart/CheckoutForm";
import useCart from "@/hooks/useCart";
import useCheckout from "@/hooks/cart/useCheckout";
import { CartViewProps } from "@/types";
import GradientText from "@/components/ui/GradientText";

const CartContent: React.FC<CartViewProps> = ({ showTitle = false }) => {
	const { cartItems, removeFromCart, clearCart, calculateTotal } = useCart();

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
					<GradientText className="text-5xl">
						{cartItems.length > 0
							? "Tu Carrito"
							: "Tu carrito está vacío"}
					</GradientText>
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
				<div className="">
					<EmptyCart />
				</div>
			)}
		</>
	);
};

export default CartContent;
