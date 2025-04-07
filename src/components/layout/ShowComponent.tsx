"use client";

import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
interface ShowComponentProps {
	children: ReactNode;
}
const ShowComponent: React.FC<ShowComponentProps> = ({ children }) => {
	const pathname = usePathname();

	const validRoutes = [
		"/",
		"/home",
		"/products",
		"/cart",
		"/about",
		"/contact",
		"/login",
		"/register",
		"/dashboard",
	];

	const isOrders = pathname?.startsWith("/dashboard/");
	const isProductDetail = pathname?.startsWith("/products/");

	const showComponents =
		validRoutes.includes(pathname || "") || isProductDetail || isOrders;
		
	return (
		<>
			{showComponents && <Navbar />}
			<main>{children}</main>
			{showComponents && <Footer />}
		</>
	);
};

export default ShowComponent;