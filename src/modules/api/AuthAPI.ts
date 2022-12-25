import BaseAPI from './BaseAPI';
import { SigninData } from './interfaces/SigninData';
import { SignupData } from './interfaces/SignupData';
import { IUser } from './interfaces/UserData';


export class AuthAPI extends BaseAPI {
	constructor() {
		super('/auth');
	}

	public signin(data: SigninData) {
		return this.http.post('/signin', data);
	}

	public signup(data: SignupData) {
		return this.http.post('/signup', data);
	}

	public read(): Promise<IUser> {
		return this.http.get('/user');
	}

	public logout() {
		return this.http.post('/logout');
	}

	create = undefined;
	update = undefined;
	delete = undefined;
}

export default new AuthAPI();
