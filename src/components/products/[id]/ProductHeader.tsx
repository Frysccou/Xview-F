import React from "react";
import { ProductHeaderProps } from "@/types";

const ProductHeader: React.FC<ProductHeaderProps> = ({ product }) => {
	return (
		<>
			<h1 className="mb-2 text-3xl font-bold bg-gradient-to-r from-[var(--pastel-purple)] via-[var(--pastel-salmon)] to-[var(--light-purple)] bg-clip-text text-transparent hover:from-[var(--light-salmon)] hover:via-[var(--light-purple)] hover:to-[var(--pastel-purple)] transition-colors duration-700 md:text-4xl">
				{product.name}
			</h1>

			<p className="mb-4 text-xl text-[var(--pastel-salmon)]">
				{product.author}
			</p>

			<div className="flex flex-wrap gap-2 mb-4">
				{product.genres &&
					product.genres.map((genre: string, index: number) => (
						<span
							key={index}
							className="px-3 py-1 text-sm text-white rounded-full glass-effect"
						>
							{genre}
						</span>
					))}
			</div>
		</>
	);
};

export default ProductHeader;
