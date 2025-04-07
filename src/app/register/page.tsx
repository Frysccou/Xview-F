"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ApiService } from "../../services/api.service";
import { FormInput } from "@/components/ui";
import useForm from "@/hooks/auth/useForm";
import useAuth from "@/hooks/useAuth";
import { validator } from "@/utils/validator";
import { showToast } from "@/components/ui/Toast";

export default function Register() {
	const router = useRouter();
	const { isAuthenticated } = useAuth();

	const { values, handleChange, handleSubmit, isSubmitting } = useForm(
		{
			email: "",
			password: "",
			name: "",
			address: "",
			phone: "",
		},
		{
			email: {
				required: true,
				custom: (value) => validator.email(value).isValid,
				errorMessage: "El correo electrónico es inválido",
			},
			password: {
				required: true,
				minLength: 6,
				errorMessage: "La contraseña debe tener al menos 6 caracteres",
			},
			name: { 
				required: true, 
				errorMessage: "El nombre es obligatorio" 
			},
			address: {
				required: true,
				errorMessage: "La dirección es obligatoria",
			},
			phone: {
				required: true,
				custom: (value) => validator.phone(value).isValid,
				errorMessage: "El formato del teléfono es inválido",
			},
		}
	);

	useEffect(() => {
		if (isAuthenticated) {
			router.push("/home");
		}
	}, [isAuthenticated, router]);

	const onSubmit = async () => {
		try {
			await ApiService.register(values);
			router.push("/login?registered=true");
		} catch (error) {
			showToast({ 
				message: error instanceof Error ? error.message : "Error durante el registro", 
				type: "error" 
			});
		}
	};

	return (
		<div className="flex flex-col md:flex-row-reverse items-center justify-center min-h-[calc(100vh-120px)] px-4 py-8">
			<div className="p-8 w-full max-w-md shadow-xl glass-effect md:ml-8">
				<h1 className="mb-6 text-3xl font-bold text-center text-white">
					Registro
				</h1>

				<form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
					<FormInput
						id="email"
						type="email"
						label="Correo Electrónico"
						placeholder="tu@email.com"
						value={values.email}
						onChange={handleChange}
						required
					/>

					<FormInput
						id="password"
						type="password"
						label="Contraseña"
						placeholder="••••••••"
						value={values.password}
						onChange={handleChange}
						required
						minLength={6}
					/>

					<FormInput
						id="name"
						type="text"
						label="Nombre"
						placeholder="Tu nombre completo"
						value={values.name}
						onChange={handleChange}
						required
					/>

					<FormInput
						id="address"
						type="text"
						label="Dirección"
						placeholder="Tu dirección"
						value={values.address}
						onChange={handleChange}
						required
					/>

					<FormInput
						id="phone"
						type="tel"
						label="Número de Teléfono"
						placeholder="+34 123 456 789"
						value={values.phone}
						onChange={handleChange}
						required
					/>

					<div>
						<button
							type="submit"
							className="px-4 py-2 w-full font-medium rounded-md login-button"
							disabled={isSubmitting}
						>
							{isSubmitting ? "Registrando..." : "Registrarse"}
						</button>
					</div>
				</form>

				<div className="mt-6 text-center">
					<p className="text-white/70">
						¿Ya tienes una cuenta?{" "}
						<Link
							href="/login"
							className="text-[var(--pastel-purple)] hover:text-[var(--light-purple)]"
						>
							Inicia sesión
						</Link>
					</p>
				</div>
			</div>

			<div className="hidden w-full max-w-md md:block">
				<Image
					src="/Mockup3d.png"
					alt="XView Mockup"
					width={400}
					height={400}
					className="object-contain"
				/>
			</div>
		</div>
	);
}
