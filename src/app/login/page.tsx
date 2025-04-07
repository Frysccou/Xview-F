"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormInput } from "@/components/ui";
import useForm from "@/hooks/auth/useForm";
import useAuth from "@/hooks/useAuth";
import { validator } from "@/utils/validator";
import { showToast } from "@/components/ui/Toast";

export default function Login() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { login, isAuthenticated, isLoading } = useAuth();

	useEffect(() => {
		if (isAuthenticated && !isLoading) {
			router.push("/home");
		}

		const registered = searchParams.get("registered");
		if (registered === "true") {
			showToast({
				message: "Registro exitoso. Ahora puedes iniciar sesión.",
				type: "success",
			});
		}
	}, [isAuthenticated, isLoading, router, searchParams]);

	const {
		values,
		handleChange,
		handleSubmit,
		isSubmitting,
		setIsSubmitting,
	} = useForm(
		{ email: "", password: "" },
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
		}
	);

	const onSubmit = async () => {
		setIsSubmitting(true);

		try {
			await login({
				email: values.email,
				password: values.password,
			});

			showToast({
				message: "¡Bienvenido! Inicio de sesión exitoso",
				type: "success",
				autoClose: 2000,
			});

			setTimeout(() => {
				router.push("/home");
			}, 1500);
		} catch (_error) {
			showToast({
				message:
					"Credenciales incorrectas. Por favor, inténtalo de nuevo.",
				type: "error",
				autoClose: 4000,
			});
			setIsSubmitting(false);
		}
	};

	return (
		<div className="flex flex-col md:flex-row items-center justify-center min-h-[calc(100vh-120px)] px-4 py-8">
			<div className="p-8 w-full max-w-md shadow-xl glass-effect md:mr-8">
				<h1 className="mb-6 text-3xl font-bold text-center text-white">
					Iniciar Sesión
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
					/>

					<div>
						<button
							type="submit"
							className="px-4 py-2 w-full font-medium rounded-md login-button"
							disabled={isSubmitting}
						>
							{isSubmitting
								? "Iniciando sesión..."
								: "Iniciar Sesión"}
						</button>
					</div>
				</form>

				<div className="mt-6 text-center">
					<p className="text-white/70">
						¿No tienes una cuenta?{" "}
						<Link
							href="/register"
							className="text-[var(--pastel-purple)] hover:text-[var(--light-purple)]"
						>
							Regístrate
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
