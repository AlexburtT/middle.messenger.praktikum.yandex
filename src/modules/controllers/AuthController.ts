import { SignupData, SigninData } from '../api/interfaces/interfaceAPI';
import { AuthAPI } from '../api/AuthAPI';
import store from '../../utills/Store';
import Router from '../../utills/Router';

class AuthController {
	constructor(private api: AuthAPI) {}

	async signup(data: SignupData) {
		try {
			await this.api.signup(data);
			await this.fetchUser();
			Router.go('/messenger');
		} catch (e: any) {
			console.error(e.message);
			store.set('user.error', e);
		}
	}

	async signin(data: SigninData) {
		try {
			await this.api.signin(data);
			await this.fetchUser(); //нужно ли оно тут?
			store.set('user.error', undefined);
			Router.go('/messenger');
		} catch (e: any) {
			console.error(e);
			store.set('user.error', e);
		}

	}

	async logout() {
		try {
			await this.api.logout();
			Router.go('/');
		} catch (e: any) {
			console.error(e.message);
			store.set('user.error', e);
		}
	}

	async fetchUser() {
		store.set('user.isLoading', true);
		const user = await this.api.read();
		store.set('user', user);
		store.set('user.isLoading', false);
	}
}

export default new AuthController(new AuthAPI());
