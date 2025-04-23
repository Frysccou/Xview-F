import React, { Suspense } from "react";
import CartContent from "@/components/views/content/CartContent";

const CartView: React.FC = () => {
	return (
		<Suspense fallback={<div>Cargando carrito...</div>}>
			<CartContent />
		</Suspense>
	);
};

export default CartView;
