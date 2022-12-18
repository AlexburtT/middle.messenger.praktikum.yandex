import { SignupData } from '../api/interfaces/SignupData';
import { SigninData } from '../api/interfaces/SigninData';
import { AuthAPI } from '../api/AuthAPI';
import store from '../../utills/Store';
import Router from '../../utills/Router';

class AuthController {
	private api = new AuthAPI();
	async signup(dataSignup: SignupData) {
		try {
			await this.api.signup(dataSignup);
			await this.fetchUser();
			Router.go('/messenger');
		} catch (e) {
			store.set('user.error', e);
		}
	}

	async signin(dataSignin: SigninData) {
		try {
			await this.api.signin(dataSignin);
			await this.fetchUser();
			Router.go('/messenger');
		} catch (e) {
			store.set('user.error', e);
		}

	}

	async logout() {
		try {
			await this.api.logout();
			Router.go('/');
		} catch (e) {
			store.set('user.error', e);
		}
	}

	async fetchUser() {
		store.set('user.isLoading', true);
		try {
			const user = await this.api.read();
			store.set('user.data', user);
		} catch (e) {
			store.set('user.error', e);
		} finally {
			store.set('user.isLoading', false);
		}
	}
}

export default new AuthController();
