import BaseAPI from './BaseAPI';
import {
	IUserInfo,
	ChangePassword,
	UserUpdateRequest,
} from './interfaces/interfaceAPI';


export class UserAPI extends BaseAPI {
	constructor() {
		super('/user');
	}

	getUser(id: number): Promise<Array<IUserInfo & { role: string }>> {
		return this.http.get(`/${id}`);
	}

	updateUser(data: UserUpdateRequest) {
		return this.http.put('/profile', data);
	}

	updatePassword(data: ChangePassword) {
		return this.http.put('/password', data);
	}

	updateAvatar(data: FormData) {
		return this.http.put('/profile/avatar', data);
	}

	create = undefined;
	read = undefined;
	update = undefined;
	delete = undefined;
}

export default new UserAPI();
