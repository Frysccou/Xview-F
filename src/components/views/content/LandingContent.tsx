import { GradientText, ButtonPrimary, ButtonSecondary } from "@/components/ui";

export default function LandingContent() {
	return (
		<main className="flex flex-col justify-center items-center px-4 min-h-screen sm:px-6 lg:px-8">
			<div className="relative z-10 text-center">
				<h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl md:text-6xl">
					<GradientText>XView Manga</GradientText>
				</h1>

				<p className="text-[var(--light-gray)] text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto mb-8">
					Descubre un mundo de historias ilustradas. Tu destino
					definitivo para los mejores mangas en español.
				</p>

				<div className="flex flex-col gap-4 justify-center sm:flex-row">
					<ButtonPrimary href="/login">Iniciar Sesión</ButtonPrimary>
					<ButtonSecondary href="/home">Novedades</ButtonSecondary>
				</div>
			</div>
		</main>
	);
}
