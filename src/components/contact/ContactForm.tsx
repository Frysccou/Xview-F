import React from "react";
import useForm from "@/hooks/auth/useForm";
import { showToast } from "@/components/ui/Toast";

const ContactForm = () => {
	const { values, handleChange, handleSubmit, isSubmitting, resetForm } = useForm(
		{
			name: "",
			email: "",
			subject: "",
			message: "",
		},
		{
			name: { required: true, errorMessage: "El nombre es obligatorio" },
			email: { required: true, errorMessage: "El email es obligatorio" },
			subject: {
				required: true,
				errorMessage: "El asunto es obligatorio",
			},
			message: {
				required: true,
				errorMessage: "El mensaje es obligatorio",
			},
		}
	);

	const onSubmit = async () => {
		console.log("Formulario enviado:", values);
		showToast({
			message: "Mensaje enviado correctamente",
			type: "success",
		});
		resetForm();
	};

	return (
		<div className="p-6 mb-8 glass-effect">
			<h2 className="mb-6 text-2xl font-semibold text-center text-white">
				Formulario de contacto
			</h2>
			<form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
				<div>
					<label
						htmlFor="name"
						className="block mb-2 text-sm font-medium text-white"
					>
						Nombre
					</label>
					<input
						id="name"
						type="text"
						className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:border-[var(--pastel-purple)]"
						placeholder="Tu nombre"
						value={values.name}
						onChange={handleChange}
					/>
				</div>

				<div>
					<label
						htmlFor="email"
						className="block mb-2 text-sm font-medium text-white"
					>
						Email
					</label>
					<input
						id="email"
						type="email"
						className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:border-[var(--pastel-purple)]"
						placeholder="tu@email.com"
						value={values.email}
						onChange={handleChange}
					/>
				</div>

				<div>
					<label
						htmlFor="subject"
						className="block mb-2 text-sm font-medium text-white"
					>
						Asunto
					</label>
					<input
						id="subject"
						type="text"
						className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:border-[var(--pastel-purple)]"
						placeholder="Asunto de tu mensaje"
						value={values.subject}
						onChange={handleChange}
					/>
				</div>

				<div>
					<label
						htmlFor="message"
						className="block mb-2 text-sm font-medium text-white"
					>
						Mensaje
					</label>
					<textarea
						id="message"
						rows={4}
						className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:border-[var(--pastel-purple)]"
						placeholder="Escribe tu mensaje aquí..."
						value={values.message}
						onChange={handleChange as any}
					/>
				</div>

				<div>
					<button
						type="submit"
						className="px-4 py-2 w-full font-medium rounded-md login-button"
						disabled={isSubmitting}
					>
						{isSubmitting ? "Enviando..." : "Enviar mensaje"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default ContactForm;
