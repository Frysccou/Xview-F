"use client";
import React from "react";
import ScheduleInfo from "@/components/contact/ScheduleInfo";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import FAQAccordion from "@/components/contact/FAQAccordion";
import ShippingInfo from "@/components/contact/ShippingInfo";
import { ToastProvider } from "@/components/ui/Toast";

export default function Contact() {
	const faqs = [
		{
			question: "¿Cuáles son los métodos de pago?",
			answer: "Aceptamos tarjetas de crédito/débito, transferencia bancaria y pago contra reembolso. Todas las transacciones están protegidas con encriptación SSL.",
		},
		{
			question: "¿Cómo puedo hacer seguimiento de mi pedido?",
			answer: "Una vez realizado tu pedido, recibirás un correo electrónico con un número de seguimiento que podrás utilizar en nuestra sección 'Mis Pedidos'.",
		},
		{
			question: "¿Hacéis envíos internacionales?",
			answer: "Actualmente realizamos envíos a toda España peninsular. Para envíos a islas o internacionales, contáctanos para consultar disponibilidad y costes adicionales.",
		},
	];

	return (
		<div className="flex flex-col items-center px-4 py-8 min-h-screen sm:px-6 lg:px-8">
			<ToastProvider />
			<h1 className="mb-6 text-3xl font-bold text-center text-white">
				<span className="text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[var(--pastel-purple)] to-[var(--pastel-salmon)]">
					Contacto
				</span>
			</h1>

			<div className="w-full max-w-3xl">
				<ScheduleInfo />
				<ContactForm />
				<ContactInfo />
				<FAQAccordion faqs={faqs} />
				<ShippingInfo />
			</div>
		</div>
	);
}
