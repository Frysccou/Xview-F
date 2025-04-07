import React, { useState, useEffect } from "react";
import { StorageService } from "@/services/storage.service";
import { Trash2, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const FavoritesSection = () => {
	const [favorites, setFavorites] = useState<
		{
			id: number;
			name: string;
			price: number;
			image: string;
			author: string;
		}[]
	>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;

	const refreshFavorites = () => {
		setFavorites(StorageService.getFavorites());
	};

	useEffect(() => {
		refreshFavorites();
		
		const handleFavoritesUpdated = () => {
			refreshFavorites();
		};
		
		window.addEventListener('favoritesUpdated', handleFavoritesUpdated);
		
		return () => {
			window.removeEventListener('favoritesUpdated', handleFavoritesUpdated);
		};
	}, []);

	const handleRemoveFavorite = (id: number) => {
		StorageService.removeFromFavorites(id);
		refreshFavorites();
		window.dispatchEvent(new Event("favoritesUpdated"));
	};

	const formatPrice = (price: any): string => {
		const numPrice = Number(price);
		return isNaN(numPrice) ? "0.00" : numPrice.toFixed(2);
	};

	const totalPages = Math.ceil(favorites.length / itemsPerPage);
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = favorites.slice(indexOfFirstItem, indexOfLastItem);

	const goToNextPage = () => {
		setCurrentPage(prev => Math.min(prev + 1, totalPages));
	};

	const goToPrevPage = () => {
		setCurrentPage(prev => Math.max(prev - 1, 1));
	};

	return (
		<div className="p-4 md:p-6 mb-8 glass-effect rounded-lg">
			<div className="flex items-center justify-center mb-6">
				<Heart size={20} className="mr-2 text-pink-500 fill-pink-500" />
				<h2 className="text-xl md:text-2xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-[var(--pastel-purple)] to-[var(--pastel-salmon)]">
					Productos Favoritos
				</h2>
			</div>

			{favorites.length === 0 ? (
				<div className="flex flex-col items-center justify-center py-8">
					<Heart size={48} className="mb-4 text-gray-400" />
					<p className="text-center text-gray-400">
						No tienes productos favoritos aún
					</p>
				</div>
			) : (
				<>
					<ul className="space-y-3 mb-4">
						{currentItems.map((favorite) => (
							<li
								key={favorite.id}
								className="relative bg-white/5 rounded-lg overflow-hidden border border-white/10 hover:border-pink-500/30 transition-all"
							>
								<Link href={`/products/${favorite.id}`}>
									<div className="flex items-center p-3 cursor-pointer">
										<div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-md overflow-hidden">
											<Image
												src={favorite.image}
												alt={favorite.name}
												fill
												sizes="(max-width: 768px) 64px, 80px"
												className="object-cover"
											/>
										</div>
										<div className="ml-4 flex-grow">
											<h3 className="font-medium text-white text-sm md:text-base line-clamp-1">
												{favorite.name}
											</h3>
											<p className="text-xs md:text-sm text-gray-400">
												{favorite.author}
											</p>
											<p className="mt-1 font-semibold text-sm md:text-base text-pink-400">
												${formatPrice(favorite.price)}
											</p>
										</div>
										<button
											type="button"
											onClick={(e) => {
												e.preventDefault();
												e.stopPropagation();
												handleRemoveFavorite(favorite.id);
											}}
											className="ml-2 p-2 bg-black/30 hover:bg-red-500/50 rounded-full transition-colors"
											title="Eliminar de favoritos"
										>
											<Trash2 size={16} />
										</button>
									</div>
								</Link>
							</li>
						))}
					</ul>

					{totalPages > 1 && (
						<div className="flex justify-center items-center mt-6">
							<button
								onClick={goToPrevPage}
								disabled={currentPage === 1}
								className={`p-2 rounded-full ${
									currentPage === 1
										? "text-gray-500 cursor-not-allowed"
										: "text-white hover:bg-white/10"
								}`}
							>
								<ChevronLeft size={20} />
							</button>
							<div className="mx-4 text-sm">
								<span className="bg-gradient-to-r from-[var(--pastel-purple)] to-[var(--pastel-salmon)] bg-clip-text text-transparent font-medium">
									{currentPage}
								</span>{" "}
								<span className="text-gray-400">de {totalPages}</span>
							</div>
							<button
								onClick={goToNextPage}
								disabled={currentPage === totalPages}
								className={`p-2 rounded-full ${
									currentPage === totalPages
										? "text-gray-500 cursor-not-allowed"
										: "text-white hover:bg-white/10"
								}`}
							>
								<ChevronRight size={20} />
							</button>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default FavoritesSection;
