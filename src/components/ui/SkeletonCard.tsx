import React from "react";

const SkeletonCard = () => {
	return (
		<div className="p-4 mb-6 w-full h-102 card-glass-effect sm:w-64 sm:h-112 flex flex-col justify-between">
			<div className="h-3/5 bg-white/10 rounded-md"></div>
			<div className="mt-4 space-y-2">
				<div className="h-4 bg-white/10 rounded-md w-3/4"></div>
				<div className="h-4 bg-white/10 rounded-md w-1/2"></div>
			</div>
		</div>
	);
};

export default SkeletonCard;
