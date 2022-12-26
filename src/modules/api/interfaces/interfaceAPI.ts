export interface SigninData {
	login: string,
	password: string
}

export interface SignupData {
	first_name: string,
	second_name: string,
	login: string,
	email: string,
	password: string,
	phone: string
}

export interface IUserInfo {
	id: number,
	first_name: string,
	second_name: string,
	display_name: string,
	login: string,
	email: string,
	phone: string,
	avatar: string,
}

export interface UserUpdateRequest {
	first_name: string,
	second_name: string,
	display_name: string,
	login: string,
	email: string,
	phone: string,
}

export interface ChangePassword {
	oldPassword: string;
	newPassword: string;
}

export interface ChangeAvatar {
	avatar: FormData,
}
