"use client";
import React from "react";
import CartItemList from "@/components/cart/CartItemList";
import CartSummary from "@/components/cart/CartSummary";
import EmptyCart from "@/components/cart/EmptyCart";
import CheckoutForm from "@/components/cart/CheckoutForm";
import useCart from "@/hooks/cart/useCart";
import useCheckout from "@/hooks/cart/useCheckout";

export default function Cart() {
	const { cartItems, setCartItems, removeItem, clearCart, calculateTotal } =
		useCart();
	const {
		showCheckout,
		paymentInfo,
		formErrors,
		handleInputChange,
		proceedToCheckout,
		handlePaymentSubmit,
	} = useCheckout(cartItems, setCartItems);

	return (
		<div className="flex flex-col items-center px-4 py-8 min-h-screen sm:px-6 lg:px-8">
			<h1 className="mb-6 text-3xl font-bold text-center text-white">
				<span className="text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[var(--pastel-purple)] to-[var(--pastel-salmon)]">
					{cartItems.length > 0
						? "Tu Carrito"
						: "Carrito de Compras Vacío"}
				</span>
			</h1>

			{cartItems.length > 0 ? (
				<div className="w-full max-w-3xl">
					<div className="p-6 mb-8 glass-effect">
						<CartItemList
							items={cartItems}
							onRemoveItem={removeItem}
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
		</div>
	);
}
