import { useState } from "react";

type FormValues = {
	[key: string]: string;
};

type FormErrors = {
	[key: string]: string;
};

type ValidationRules = {
	[key: string]: {
		required?: boolean;
		minLength?: number;
		pattern?: RegExp;
		custom?: (value: string) => boolean;
		errorMessage?: string;
	};
};

const useForm = <T extends FormValues>(
	initialValues: T,
	validationRules?: ValidationRules
) => {
	const [values, setValues] = useState<T>(initialValues);
	const [errors, setErrors] = useState<FormErrors>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [touched, setTouched] = useState<Record<string, boolean>>({});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setValues((prev) => ({
			...prev,
			[id]: value,
		}));

		setTouched(prev => ({
			...prev,
			[id]: true
		}));

		if (errors[id]) {
			setErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors[id];
				return newErrors;
			});
		}
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		const { id } = e.target;
		setTouched(prev => ({
			...prev,
			[id]: true
		}));
		
		validateField(id);
	};

	const validateField = (fieldName: string): boolean => {
		if (!validationRules || !validationRules[fieldName]) return true;

		const value = values[fieldName] || "";
		const rules = validationRules[fieldName];
		let isValid = true;

		if (rules.required && !value) {
			setErrors(prev => ({
				...prev,
				[fieldName]: rules.errorMessage || "Este campo es obligatorio"
			}));
			isValid = false;
		} else if (rules.minLength && value.length < rules.minLength) {
			setErrors(prev => ({
				...prev,
				[fieldName]: rules.errorMessage || `Debe tener al menos ${rules.minLength} caracteres`
			}));
			isValid = false;
		} else if (rules.pattern && !rules.pattern.test(value)) {
			setErrors(prev => ({
				...prev,
				[fieldName]: rules.errorMessage || "Formato inválido"
			}));
			isValid = false;
		} else if (rules.custom && !rules.custom(value)) {
			setErrors(prev => ({
				...prev,
				[fieldName]: rules.errorMessage || "Valor inválido"
			}));
			isValid = false;
		} else {
			setErrors(prev => {
				const newErrors = { ...prev };
				delete newErrors[fieldName];
				return newErrors;
			});
		}

		return isValid;
	};

	const validate = (): boolean => {
		if (!validationRules) return true;

		const newErrors: FormErrors = {};
		let isValid = true;

		Object.keys(validationRules).forEach((key) => {
			const value = values[key] || "";
			const rules = validationRules[key];

			if (rules.required && !value) {
				newErrors[key] =
					rules.errorMessage || "Este campo es obligatorio";
				isValid = false;
			} else if (rules.minLength && value.length < rules.minLength) {
				newErrors[key] =
					rules.errorMessage ||
					`Debe tener al menos ${rules.minLength} caracteres`;
				isValid = false;
			} else if (rules.pattern && !rules.pattern.test(value)) {
				newErrors[key] = rules.errorMessage || "Formato inválido";
				isValid = false;
			} else if (rules.custom && !rules.custom(value)) {
				newErrors[key] = rules.errorMessage || "Valor inválido";
				isValid = false;
			}
		});

		setErrors(newErrors);
		return isValid;
	};

	const handleSubmit =
		(callback: () => Promise<void>) => async (e: React.FormEvent) => {
			e.preventDefault();

			if (validate()) {
				setIsSubmitting(true);
				try {
					await callback();
				} finally {
					setIsSubmitting(false);
				}
			}
		};

	const resetForm = () => {
		setValues(initialValues);
		setErrors({});
		setTouched({});
	};

	return {
		values,
		errors,
		touched,
		isSubmitting,
		setIsSubmitting,
		handleChange,
		handleBlur,
		handleSubmit,
		resetForm,
		setValues,
		validate
	};
};

export default useForm;