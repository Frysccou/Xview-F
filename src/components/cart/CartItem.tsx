import React from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/types";

interface CartItemProps {
	item: CartItemType;
	onRemove: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove }) => {
	return (
		<div className="flex flex-col p-4 rounded-lg border bg-white/5 border-white/10 sm:flex-row">
			<div className="relative mb-4 w-full h-32 sm:mb-0 sm:w-32">
				<Image
					src={item.image}
					alt={item.name}
					fill
					sizes="(max-width: 768px) 100vw, 128px"
					style={{
						objectFit: "cover",
						borderRadius: "8px",
					}}
				/>
			</div>
			<div className="flex flex-col flex-grow justify-between ml-0 sm:ml-4">
				<div>
					<h3 className="text-xl font-medium text-white">
						{item.name}
					</h3>
					<p className="text-lg font-bold text-[var(--pastel-salmon)]">
						${item.price}
					</p>
				</div>
				<div className="flex justify-between items-center mt-4">
					<div className="flex items-center">
						<span className="text-white">
							Cantidad: {item.quantity}
						</span>
					</div>
					<button
						onClick={() => onRemove(item.id)}
						className="flex justify-center items-center p-2 text-[var(--pastel-salmon)] rounded-full hover:bg-white/10"
					>
						<Trash2 size={20} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default CartItem;
