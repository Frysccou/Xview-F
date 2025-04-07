import type { Metadata } from "next";
import "./globals.css";
import { Outfit } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/components/ui/Toast";
import ShowComponent from "@/components/layout/ShowComponent";

const outfit = Outfit({
	variable: "--font-outfit",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "XView",
	description: "Plataforma de gestión de compra de mangas",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="es" style={{ height: "100%" }}>
			<body
				className={`${outfit.variable} antialiased gradient-bg h-full overflow-y-auto`}
			>
				<div className="blob-1"></div>
				<div className="blob-2"></div>
				<div className="blob-3"></div>
				<AuthProvider>
					<div className="flex relative z-10 flex-col min-h-screen">
						<ShowComponent>
							<main className="flex-grow">{children}</main>
						</ShowComponent>
					</div>
					<ToastProvider />
				</AuthProvider>
			</body>
		</html>
	);
}
