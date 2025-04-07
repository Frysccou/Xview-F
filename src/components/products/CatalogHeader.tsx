import { FC } from "react";

const CatalogHeader: FC = () => {
	return (
		<h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
			<span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--pastel-purple)] to-[var(--pastel-salmon)]">
				Catálogo de Mangas
			</span>
		</h1>
	);
};

export default CatalogHeader;
