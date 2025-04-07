import React from "react";
import { PriceDisplayProps } from "@/types"

const PriceDisplay: React.FC<PriceDisplayProps> = ({ total }) => {
	return (
		<div className="flex items-center mb-6">
			<span className="text-white">
				Precio: <span className="font-bold">${total}</span>
			</span>
		</div>
	);
};

export default PriceDisplay;
