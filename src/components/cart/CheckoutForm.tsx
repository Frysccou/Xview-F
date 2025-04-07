import React from "react";
import { CreditCard } from "lucide-react";
import PaymentField from "./PaymentField";

interface CheckoutFormProps {
	paymentInfo: {
		cardNumber: string;
		cardHolder: string;
		expiryDate: string;
		cvv: string;
		dni: string;
		address: string;
	};
	formErrors: {
		cardNumber: boolean;
		cardHolder: boolean;
		expiryDate: boolean;
		cvv: boolean;
		dni: boolean;
		address: boolean;
	};
	onInputChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	onSubmit: (e: React.FormEvent) => Promise<void>;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
	paymentInfo,
	formErrors,
	onInputChange,
	onSubmit,
}) => {
	return (
		<div className="p-6 mb-8 glass-effect">
			<h2 className="mb-6 text-2xl font-semibold text-center text-white">
				Información de Pago
			</h2>
			<form onSubmit={onSubmit} className="space-y-4">
				<div>
					<label
						htmlFor="cardNumber"
						className="block mb-2 text-sm font-medium text-white"
					>
						Número de Tarjeta
					</label>
					<div
						className={`flex items-center px-4 py-2 rounded-md border ${
							formErrors.cardNumber
								? "border-red-500 bg-red-500/10"
								: "bg-white/10 border-white/20"
						}`}
					>
						<CreditCard
							size={20}
							className="mr-2 text-[var(--pastel-purple)]"
						/>
						<input
							id="cardNumber"
							type="text"
							placeholder="1234 5678 9012 3456"
							className="w-full bg-transparent text-white focus:outline-none"
							value={paymentInfo.cardNumber}
							onChange={onInputChange}
						/>
					</div>
					{formErrors.cardNumber && (
						<p className="mt-1 text-xs text-red-500">
							Este campo es obligatorio
						</p>
					)}
				</div>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<PaymentField
						id="cardHolder"
						label="Titular de la Tarjeta"
						type="text"
						placeholder="Nombre completo"
						value={paymentInfo.cardHolder}
						error={formErrors.cardHolder}
						onChange={onInputChange}
					/>
					<PaymentField
						id="dni"
						label="DNI"
						type="text"
						placeholder="12345678X"
						value={paymentInfo.dni}
						error={formErrors.dni}
						onChange={onInputChange}
					/>
				</div>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<PaymentField
						id="expiryDate"
						label="Fecha de Expiración"
						type="text"
						placeholder="MM/AA"
						value={paymentInfo.expiryDate}
						error={formErrors.expiryDate}
						onChange={onInputChange}
					/>
					<PaymentField
						id="cvv"
						label="CVV"
						type="text"
						placeholder="123"
						value={paymentInfo.cvv}
						error={formErrors.cvv}
						onChange={onInputChange}
					/>
				</div>

				<div>
					<label
						htmlFor="address"
						className="block mb-2 text-sm font-medium text-white"
					>
						Dirección de Envío
					</label>
					<textarea
						id="address"
						rows={3}
						placeholder="Calle, número, piso, código postal, ciudad"
						className={`w-full px-4 py-2 rounded-md text-white focus:outline-none ${
							formErrors.address
								? "border-red-500 bg-red-500/10"
								: "bg-white/10 border-white/20"
						}`}
						value={paymentInfo.address}
						onChange={onInputChange}
					/>
					{formErrors.address && (
						<p className="mt-1 text-xs text-red-500">
							Este campo es obligatorio
						</p>
					)}
				</div>

				<div className="p-4 rounded-md bg-white/5 border border-[var(--pastel-purple)]/30">
					<p className="text-white/80">
						<span className="font-medium text-[var(--pastel-purple)]">
							Nota:
						</span>{" "}
						Tu pedido será entregado en un plazo de 3 días hábiles
						después de confirmar la compra.
					</p>
				</div>

				<div>
					<button
						type="submit"
						className="w-full px-4 py-3 font-medium rounded-md login-button"
					>
						Confirmar Compra
					</button>
				</div>
			</form>
		</div>
	);
};

export default CheckoutForm;
