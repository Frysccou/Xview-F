import React from "react";
import { ProductHeaderProps } from "@/types";

const ProductHeader: React.FC<ProductHeaderProps> = ({ product }) => {
	return (
		<>
			<h1 className="mb-2 text-3xl font-bold text-white md:text-4xl">
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
