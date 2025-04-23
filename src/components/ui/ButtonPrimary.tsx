import React from "react";
import Link from "next/link";

interface ButtonPrimaryProps {
	href: string;
	children: React.ReactNode;
	className?: string;
	onClick?: () => void;
}

const ButtonPrimary = ({
	href,
	children,
	className = "",
	onClick,
}: ButtonPrimaryProps) => {
	return (
		<Link
			href={href}
			className={`px-8 py-3 bg-[var(--pastel-purple)] hover:bg-[var(--light-purple)] text-[var(--black)] font-semibold rounded-lg transition-all duration-300 hover:scale-105 ${className}`}
			onClick={onClick}
		>
			{children}
		</Link>
	);
};

export default ButtonPrimary;