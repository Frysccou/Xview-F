import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { ProductCardProps } from "@/types";

const ProductCard: FC<ProductCardProps> = ({ product, onAddToCart }) => {
	return (
		<div className="card-glass-effect overflow-hidden hover:shadow-lg transition-shadow">
			<Link href={`/products/${product.id}`}>
				<div className="aspect-square relative">
					<Image
						src={product.image || "/placeholder.svg"}
						alt={product.name}
						className="object-cover w-full h-full"
						fill
					/>
				</div>
			</Link>
			<div className="p-4">
				<Link href={`/products/${product.id}`}>
					<h3 className="font-semibold text-lg text-white hover:text-purple-300">
						{product.name}
					</h3>
				</Link>
				<div className="flex justify-between items-center mt-2">
					<span className="font-bold text-lg text-white">
						$
						{typeof product.price === "number"
							? product.price.toFixed(2)
							: product.price}
					</span>
					<div className="flex gap-2">
						{product.year && (
							<span className="text-sm bg-purple-900/30 px-2 py-1 rounded text-white">
								{product.year}
							</span>
						)}
					</div>
				</div>
				<div className="mt-4">
					<button
						onClick={() => onAddToCart(product)}
						className="flex justify-center items-center w-full px-4 py-2 font-medium text-white rounded-md bg-[var(--pastel-purple)]/80 hover:bg-[var(--pastel-purple)]"
					>
						<ShoppingCart size={16} className="mr-2" />
						Comprar
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
