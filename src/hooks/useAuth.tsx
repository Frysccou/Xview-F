"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { AuthContextType } from "@/types";

const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("Mal uso de useAuth");
	}

	const [authState, setAuthState] = useState({
		isAuthenticated: context.isAuthenticated,
		user: context.user,
		isLoading: context.isLoading,
	});

	useEffect(() => {
		setAuthState({
			isAuthenticated: context.isAuthenticated,
			user: context.user,
			isLoading: context.isLoading,
		});
	}, [context.isAuthenticated, context.user, context.isLoading]);

	return {
		...context,
		isAuthenticated: authState.isAuthenticated,
		user: authState.user,
		isLoading: authState.isLoading,
	};
};

export default useAuth;
