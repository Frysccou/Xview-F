import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ApiService } from "@/services/api.service";
import { StorageService } from "@/services/storage.service";
import { IUser } from "@/types";
import useAuth from "@/hooks/useAuth";

const useUserData = () => {
	const [user, setUser] = useState<Partial<IUser> | null>(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	const { logout: authLogout } = useAuth();

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const storedUser = StorageService.getUserData();
				if (storedUser) {
					setUser(storedUser);
					setLoading(false);
					return;
				}

				const userData = await ApiService.getCurrentUser();
				if (userData) {
					setUser(userData);
					StorageService.setUserData(userData);
				}
			} catch {
				router.push("/login");
			} finally {
				setLoading(false);
			}
		};

		fetchUserData();
	}, [router]);

	const handleLogout = () => {
		authLogout();
		router.push("/login");
	};

	return {
		user,
		loading,
		handleLogout,
	};
};

export default useUserData;
