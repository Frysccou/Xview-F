import React, { useState, useEffect } from "react";
import { ShoppingCart, Heart } from "lucide-react";
import { ActionButtonsProps } from "@/types";
import { StorageService } from "@/services/storage.service";

const ActionButtons: React.FC<ActionButtonsProps> = ({
	onAddToCart,
	product,
}) => {
	const [isFavorite, setIsFavorite] = useState(false);

	useEffect(() => {
		if (product) {
			const isInFavorites = StorageService.isProductFavorite(product.id);
			setIsFavorite(isInFavorites);
		}
	}, [product]);

	const handleFavoriteToggle = () => {
		if (!product) return;

		if (isFavorite) {
			StorageService.removeFromFavorites(product.id);
		} else {
			StorageService.addToFavorites({
				id: product.id,
				name: product.name,
				price: product.price,
				image: product.image,
				author: product.author,
			});
		}
		
		setIsFavorite(!isFavorite);
		window.dispatchEvent(new Event("favoritesUpdated"));
	};

	return (
		<div className="flex flex-col gap-3 sm:flex-row">
			<button
				type="button"
				onClick={onAddToCart}
				className="flex justify-center items-center px-6 py-3 w-full font-medium rounded-md login-button sm:w-auto"
			>
				<ShoppingCart size={20} className="mr-2" />
				Añadir al carrito
			</button>

			<button
				type="button"
				onClick={handleFavoriteToggle}
				className={`flex justify-center items-center px-6 py-3 w-full font-medium text-white rounded-md border border-white/20 ${
					isFavorite
						? "bg-pink-500/20 hover:bg-pink-500/30"
						: "bg-white/5 hover:bg-white/10"
				} sm:w-auto`}
			>
				<Heart
					size={20}
					className={`mr-2 ${isFavorite ? "fill-pink-500" : ""}`}
				/>
				{isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
			</button>
		</div>
	);
};

export default ActionButtons;
