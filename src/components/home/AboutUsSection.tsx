import React from "react";
import Image from "next/image";

const AboutUsSection = () => {
	return (
		<section className="mb-16 w-full max-w-6xl">
			<h2 className="mb-8 text-4xl font-bold text-center text-white md:text-5xl">
				<span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--pastel-purple)] to-[var(--pastel-salmon)]">
					Nuestra Historia
				</span>
			</h2>
			<div className="flex flex-col gap-8 md:flex-row">
				<div className="p-6 w-full md:w-1/2 glass-effect">
					<div className="relative w-full h-[300px] overflow-hidden rounded-lg">
						<Image
							src="https://i.pinimg.com/736x/a7/ac/86/a7ac86ddd967710ec30277d4e67cea73.jpg"
							alt="Imagen de nuestra historia"
							fill
							style={{ objectFit: "cover" }}
							className="transition-transform duration-300 hover:scale-105"
							unoptimized
						/>
					</div>
				</div>

				<div className="p-6 w-full md:w-1/2 glass-effect">
					<h3 className="mb-4 text-2xl font-semibold text-white">
						Quiénes Somos
					</h3>
					<p className="mb-4 text-white/80">
						XView nació de la pasión por el manga y la cultura
						japonesa. Desde nuestros humildes comienzos en 2025, nos
						hemos dedicado a traer las mejores historias ilustradas
						a los lectores hispanohablantes.
					</p>
					<p className="mb-4 text-white/80">
						Nuestra misión es simple: hacer que el manga sea
						accesible para todos, ofreciendo una selección
						cuidadosamente curada de títulos populares y joyas
						ocultas que merecen ser descubiertas.
					</p>
					<p className="text-white/80">
						Con un equipo de entusiastas del manga, trabajamos
						incansablemente para garantizar que cada volumen que
						ofrecemos cumpla con los más altos estándares de
						calidad, tanto en contenido como en presentación.
					</p>
				</div>
			</div>
		</section>
	);
};

export default AboutUsSection;
