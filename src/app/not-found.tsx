import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
	return (
		<div className="flex min-h-screen items-center justify-center text-white">
			<div className="mx-auto max-w-md text-center">
				<div className="mb-6 text-8xl font-bold">
					<span className="inline-block animate-bounce">4</span>
					<span className="inline-block animate-pulse mx-1">0</span>
					<span className="inline-block animate-bounce">4</span>
				</div>

				<div className="mb-8 text-4xl font-light">¯\_(ツ)_/¯</div>

				<Link
					href="/"
					className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10 hover:scale-105 focus:outline-none"
				>
					<ArrowLeft className="mr-2 h-4 w-4" />
					Volver
				</Link>
			</div>
		</div>
	);
}
