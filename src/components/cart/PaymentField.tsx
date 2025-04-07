import React from "react";

interface PaymentFieldProps {
	id: string;
	label: string;
	type: string;
	placeholder: string;
	value: string;
	error: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PaymentField: React.FC<PaymentFieldProps> = ({
	id,
	label,
	type,
	placeholder,
	value,
	error,
	onChange,
}) => {
	return (
		<div>
			<label
				htmlFor={id}
				className="block mb-2 text-sm font-medium text-white"
			>
				{label}
			</label>
			<input
				id={id}
				type={type}
				placeholder={placeholder}
				className={`w-full px-4 py-2 rounded-md text-white focus:outline-none ${
					error
						? "border-red-500 bg-red-500/10"
						: "bg-white/10 border-white/20"
				}`}
				value={value}
				onChange={onChange}
			/>
			{error && (
				<p className="mt-1 text-xs text-red-500">
					Este campo es obligatorio
				</p>
			)}
		</div>
	);
};

export default PaymentField;
