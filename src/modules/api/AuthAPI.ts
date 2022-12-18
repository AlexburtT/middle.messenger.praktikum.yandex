import BaseAPI from './BaseAPI';
import { SigninData } from './interfaces/SigninData';
import { SignupData } from './interfaces/SignupData';
import { UserData } from './interfaces/UserData';


export class AuthAPI extends BaseAPI {
	constructor() {
		super('/auth');
	}

	public signin(dataSignin: SigninData) {
		return this.http.post('/signin', dataSignin);
	}

	public signup(dataSignup: SignupData) {
		return this.http.post('/signup', dataSignup);
	}

	public read(): Promise<UserData> {
		return this.http.get('/user');
	}

	public logout() {
		return this.http.post('/logout');
	}

	create = undefined;
	update = undefined;
	delete = undefined;
}
