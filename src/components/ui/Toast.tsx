"use client";

import React from "react";
import {
	ToastContainer,
	toast,
	ToastOptions,
	TypeOptions,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const activeToasts: Record<string, number> = {};

interface ToastProps {
	message: string;
	type?: TypeOptions;
	autoClose?: number;
	position?:
		| "top-right"
		| "top-center"
		| "top-left"
		| "bottom-right"
		| "bottom-center"
		| "bottom-left";
}

export const showToast = ({
	message,
	type = "info",
	autoClose = 3000,
	position = "top-right",
}: ToastProps) => {
	const baseKey = `${message}-${type}`;
	
	if (activeToasts[baseKey] && Date.now() - activeToasts[baseKey] < 5000) {
		return;
	}
	
	activeToasts[baseKey] = Date.now();
	
	const toastOptions: ToastOptions = {
		position,
		autoClose,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		style: { zIndex: 9999 },
		toastId: baseKey,
		onClose: () => {
			setTimeout(() => {
				delete activeToasts[baseKey];
			}, 500);
		}
	};

	switch (type) {
		case "success":
			toast.success(message, toastOptions);
			break;
		case "error":
			toast.error(message, toastOptions);
			break;
		case "warning":
			toast.warning(message, toastOptions);
			break;
		case "info":
			toast.info(message, toastOptions);
			break;
		default:
			toast(message, toastOptions);
	}
};

export const ToastProvider = () => {
	return (
		<ToastContainer
			position="top-right"
			autoClose={3000}
			limit={1}
			newestOnTop
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
			theme="dark"
			style={{ zIndex: 9999 }}
		/>
	);
};
