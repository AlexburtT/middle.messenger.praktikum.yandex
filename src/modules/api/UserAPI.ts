import BaseAPI from './BaseAPI';
import { IUser } from './interfaces/UserData';
import { IPassword } from './interfaces/PasswordData';

export class UserAPI extends BaseAPI {
	constructor() {
		super('/user');
	}

	updateUser(data: IUser) {
		return this.http.put('/profile', data);
	}

	updatePassword(data: IPassword) {
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
