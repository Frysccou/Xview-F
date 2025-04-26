import React from "react";
import SkeletonCard from "./SkeletonCard";

const SkeletonCardContainer = () => {
	return (
		<div className="grid grid-cols-5 gap-4 sm:grid-cols-1">
			<SkeletonCard />
			<SkeletonCard />
			<SkeletonCard />
			<SkeletonCard />
			<SkeletonCard />
		</div>
	);
};

export default SkeletonCardContainer;
