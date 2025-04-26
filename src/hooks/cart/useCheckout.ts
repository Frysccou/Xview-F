import { useState } from "react";
import { useRouter } from "next/navigation";
import { StorageService } from "@/services/storage.service";
import { ApiService } from "@/services/api.service";
import { showToast } from "@/components/ui/Toast";
import usePaymentForm from "./usePaymentForm";
import useCart from "@/hooks/useCart";

const useCheckout = () => {
	const [showCheckout, setShowCheckout] = useState(false);
	const router = useRouter();
	const { paymentInfo, formErrors, handleInputChange, validateForm } = usePaymentForm();
	const { cartItems, clearCart } = useCart();

	const proceedToCheckout = () => {
		setShowCheckout(true);
	};

	const handlePaymentSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const newErrors = validateForm();

		if (Object.values(newErrors).some((error) => error)) {
			showToast({
				message: "Por favor, completa todos los campos requeridos",
				type: "error",
			});
			return;
		}

		const token = StorageService.getToken();

		if (!token) {
			showToast({
				message: "Debes iniciar sesión para completar la compra",
				type: "error",
			});
			setTimeout(() => {
				router.push("/login");
			}, 1500);
			return;
		}

		const productsWithQuantity = cartItems.map((item) => ({
			id: Number(item.id),
			quantity: 1,
		}));

		try {
			await ApiService.createOrder({
				products: productsWithQuantity,
			});

			clearCart();
			setShowCheckout(false);
			showToast({
				message: "¡Compra realizada con éxito!",
				type: "success",
			});
			setTimeout(() => {
				router.push("/products");
			}, 1500);
		} catch (error) {
			showToast({
				message: "Error al procesar tu compra. Inténtalo de nuevo.",
				type: "error",
			});
		}
	};

	return {
		showCheckout,
		paymentInfo,
		formErrors,
		handleInputChange,
		proceedToCheckout,
		handlePaymentSubmit,
	};
};

export default useCheckout;
