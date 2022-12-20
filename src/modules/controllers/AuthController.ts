import { SignupData } from '../api/interfaces/SignupData';
import { SigninData } from '../api/interfaces/SigninData';
import API, { AuthAPI } from '../api/AuthAPI';
import store from '../../utills/Store';
import Router from '../../utills/Router';

export class AuthController {
	private readonly api: AuthAPI;

	constructor() {
		this.api = API;
	}

	async signup(data: SignupData) {
		try {
			await this.api.signup(data);
			await this.fetchUser();
			Router.go('/messenger');
		} catch (e) {
			store.set('user', e);
		}
	}

	async signin(data: SigninData) {
		try {
			await this.api.signin(data);

			Router.go('/messenger');
		} catch (e) {
			store.set('userr', e);
		}

	}

	async logout() {
		try {
			await this.api.logout();
			Router.go('/');
		} catch (e) {
			store.set('user', e);
		}
	}

	async fetchUser() {
		store.set('user.isLoading', true);
		const user = await this.api.read();
		store.set('user', user);
		store.set('user.isLoading', false);
	}
}

export default new AuthController();
