import React from "react";
import { IUser } from "@/types";

interface ProfileAvatarProps {
	user: IUser;
}

const ProfileAvatar = ({ user }: ProfileAvatarProps) => {
	return (
		<div className="flex justify-center mb-8">
			<div className="flex justify-center items-center w-32 h-32 text-5xl font-bold text-[var(--black)] bg-gradient-to-r from-[var(--pastel-purple)] to-[var(--pastel-salmon)] rounded-full">
				{user.name ? user.name.charAt(0).toUpperCase() : "U"}
			</div>
		</div>
	);
};

export default ProfileAvatar;
