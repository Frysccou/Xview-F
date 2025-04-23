import React from "react";
import Link from "next/link";
import { Trash2 } from "lucide-react";

const EmptyCart: React.FC = () => {
	return (
		<div className="w-full max-w-md">
			<div className="flex flex-col items-center p-6 glass-effect">
				<div className="mb-6 p-6 rounded-full bg-white/5">
					<Trash2 size={64} className="text-[var(--pastel-purple)]" />
				</div>
				<p className="mb-6 text-center text-white/80">
					Tu carrito está vacío. ¿Por qué no añades algunos productos?
				</p>
				<Link
					href="/products"
					className="px-6 py-3 font-medium rounded-md login-button"
				>
					Ver Productos
				</Link>
			</div>
		</div>
	);
};

export default EmptyCart;
