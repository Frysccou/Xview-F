import { NextResponse, NextRequest } from "next/server";
import { NextURL } from "next/dist/server/web/next-url";

export function middleware(request: NextRequest) {
	const { pathname, origin } = request.nextUrl;
	const token = request.cookies.get("token")?.value;
	const userData = request.cookies.get("userData")?.value;

	const protectedRoutes = [
		"/dashboard",
		"/cart",
		"/contact",
		"/profile",
		"/dashboard/orders",
	];

	const isProtectedRoute = protectedRoutes.some(
		(route) => pathname === route || pathname.startsWith(`${route}/`)
	);

	if (isProtectedRoute && (!token || !userData)) {
		const response = NextResponse.redirect(new NextURL("/login", origin));

		response.headers.set(
			"Cache-Control",
			"no-store, no-cache, must-revalidate, proxy-revalidate"
		);
		response.headers.set("Pragma", "no-cache");
		response.headers.set("Expires", "0");

		return response;
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/dashboard/:path*",
		"/cart",
		"/checkout",
		"/profile",
		"/dashboard/orders",
	],
};
