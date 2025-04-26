import React from "react";
import SkeletonCard from "./SkeletonCard";

const SkeletonCardContainer = () => {
	return (
		<div className="grid grid-cols-3 gap-4">
			<SkeletonCard />
			<SkeletonCard />
			<SkeletonCard />
		</div>
	);
};

export default SkeletonCardContainer;
