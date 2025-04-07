export type ValidationResult = {
	isValid: boolean;
	message?: string;
};

export const validator = {
	required: (value: string): ValidationResult => {
		return {
			isValid: value.trim().length > 0,
			message: "Este campo es obligatorio",
		};
	},

	email: (value: string): ValidationResult => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return {
			isValid: emailRegex.test(value),
			message: "Formato de correo electrónico inválido",
		};
	},

	minLength: (value: string, length: number): ValidationResult => {
		return {
			isValid: value.length >= length,
			message: `Debe tener al menos ${length} caracteres`,
		};
	},

	phone: (value: string): ValidationResult => {
		const phoneRegex =
			/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/;
		return {
			isValid: phoneRegex.test(value),
			message: "Formato de teléfono inválido",
		};
	},

	validateForm: (
		values: Record<string, string>,
		rules: Record<string, ((value: string) => ValidationResult)[]>
	): Record<string, string> => {
		const errors: Record<string, string> = {};

		Object.keys(rules).forEach((field) => {
			const fieldValidators = rules[field];
			const value = values[field] || "";

			for (const validator of fieldValidators) {
				const result = validator(value);
				if (!result.isValid) {
					errors[field] = result.message || "Campo inválido";
					break;
				}
			}
		});

		return errors;
	},
};
