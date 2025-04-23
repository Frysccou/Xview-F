import React from "react";

interface CartSummaryProps {
	total: number;
	onClearCart: () => void;
	onCheckout: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
	total,
	onClearCart,
	onCheckout,
}) => {
	return (
		<>
			<div className="flex justify-between items-center mt-6 pt-6 border-t border-white/10">
				<button
					onClick={onClearCart}
					className="px-4 py-2 text-white rounded-md border bg-white/10 border-white/20 hover:bg-white/20"
				>
					Vaciar Carrito
				</button>
				<div className="text-xl font-bold text-white">
					Total:{" "}
					<span className="text-[var(--pastel-salmon)]">
						${total.toFixed(2)}
					</span>
				</div>
			</div>

			<div className="mt-6">
				<button
					onClick={onCheckout}
					className="w-full px-4 py-3 font-medium rounded-md login-button"
				>
					Proceder al Pago
				</button>
			</div>
		</>
	);
};

export default CartSummary;
