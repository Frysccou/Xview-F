"use client";
import React from "react";
import CheckoutForm from "./CheckoutForm";

interface CheckoutSectionProps {
	showCheckout: boolean;
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

const CheckoutSection: React.FC<CheckoutSectionProps> = ({
	showCheckout,
	paymentInfo,
	formErrors,
	onInputChange,
	onSubmit,
}) => {
	if (!showCheckout) return null;

	return (
		<CheckoutForm
			paymentInfo={paymentInfo}
			formErrors={formErrors}
			onInputChange={onInputChange}
			onSubmit={onSubmit}
		/>
	);
};

export default CheckoutSection;
