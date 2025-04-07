import React from "react";
import Link from "next/link";
import { Github, Instagram, Linkedin } from "lucide-react";

const SocialLinks = () => {
	return (
		<div className="mt-6">
			<h3 className="mb-3 text-lg font-medium text-center text-white">
				Síguenos en redes sociales
			</h3>
			<div className="flex justify-center space-x-6">
				<Link
					href="#"
					className="text-white hover:text-[var(--pastel-purple)] transition-colors"
				>
					<Github size={34} />
				</Link>
				<Link
					href="#"
					className="text-white hover:text-[var(--pastel-purple)] transition-colors"
				>
					<Instagram size={34} />
				</Link>
				<Link
					href="#"
					className="text-white hover:text-[var(--pastel-purple)] transition-colors"
				>
					<Linkedin size={34} />
				</Link>
			</div>
		</div>
	);
};

export default SocialLinks;
