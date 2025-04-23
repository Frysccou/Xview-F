"use client";
import React from "react";
import Sidebar from "@/components/ui/Sidebar";
import useUserData from "@/hooks/dashboard/useUserData";
import useTabNavigation from "@/hooks/dashboard/useTabNavigation";
import ProfileAvatar from "@/components/dashboard/ProfileAvatar";
import UserInfoCard from "@/components/dashboard/UserInfoCard";
import FavoritesSection from "@/components/dashboard/FavoritesSection";
import LoadingSpinner from "@/components/dashboard/LoadingSpinner";
import { useRouter } from "next/navigation";
import { IUser } from "@/types";

export default function DashboardContent() {
	const { activeTab, setActiveTab } = useTabNavigation("profile");
	const { user, loading, handleLogout } = useUserData();
	const router = useRouter();

	if (loading) {
		return <LoadingSpinner />;
	}

	if (!user) {
		router.push("/login");
		return null;
	}

	const userComplete = user as IUser;

	return (
		<div className="flex flex-col items-center px-4 py-8 min-h-screen sm:px-6 lg:px-8">
			<h1 className="mb-6 text-3xl font-bold text-center text-white">
				<span className="text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[var(--pastel-purple)] to-[var(--pastel-salmon)]">
					Mi Perfil
				</span>
			</h1>

			<Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

			<div className="w-full max-w-md">
				{activeTab === "profile" ? (
					<>
						<ProfileAvatar user={userComplete} />
						<UserInfoCard
							user={userComplete}
							onLogout={handleLogout}
						/>
						<FavoritesSection />
					</>
				) : (
					<></>
				)}
			</div>
		</div>
	);
}
