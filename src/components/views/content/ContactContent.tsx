"use client";
import React from "react";
import ScheduleInfo from "@/components/contact/ScheduleInfo";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import FAQAccordion from "@/components/contact/FAQAccordion";
import ShippingInfo from "@/components/contact/ShippingInfo";

export default function ContactContent() {
	const faqs = [
		{
			question: "¿Cuáles son los métodos de pago?",
			answer: "Aceptamos tarjetas de crédito y débito, transferencias bancarias y billeteras virtuales como Mercado Pago. Todas las transacciones están protegidas con encriptación SSL.",
		},
		{
			question: "¿Cómo accedo a los mangas que compré?",
			answer: "Después de completar la compra, recibirás un correo con los enlaces de descarga. También podés acceder a ellos desde el enlace que aparece en la pantalla de confirmación.",
		},
		{
			question: "¿Puedo leer los mangas desde el celular?",
			answer: "Sí, nuestra tienda es compatible con dispositivos móviles. Podés leer desde el navegador de tu celular sin necesidad de instalar ninguna app.",
		},
	];

	return (
		<div className="flex flex-col items-center px-4 py-8 min-h-screen sm:px-6 lg:px-8">
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
