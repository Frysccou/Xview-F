import React from "react";
import Link from "next/link";
import { ButtonSecondaryProps } from "@/types";

const ButtonSecondary = ({
	href,
	children,
	className = "",
	onClick,
}: ButtonSecondaryProps) => {
	return (
		<Link
			href={href}
			className={`px-8 py-3 bg-transparent border-2 border-[var(--pastel-salmon)] hover:bg-[var(--pastel-salmon)] hover:bg-opacity-20 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 ${className}`}
			onClick={onClick}
		>
			{children}
		</Link>
	);
};

export default ButtonSecondary;