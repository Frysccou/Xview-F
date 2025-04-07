import { useRouter } from "next/navigation";
import { StorageService } from "@/services/storage.service";
import { IProduct } from "@/types";

const useCart = () => {
	const router = useRouter();

	const handleQuickAddToCart = (product: IProduct) => {
		StorageService.addToCart({
			id: product.id,
			name: product.name,
			price: product.price,
			image: product.image,
			quantity: 1,
		});
		router.push("/cart");
	};

	return { handleQuickAddToCart };
};

export default useCart;
