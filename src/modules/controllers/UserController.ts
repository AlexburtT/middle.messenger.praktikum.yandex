import { UserAPI } from '../api/UserAPI';
import AuthController from './AuthController';

export class UserController {

	constructor(private api: UserAPI) {}

 async updateAvatar(data: FormData) {
		try {
			await this.api.updateAvatar(data);
			await AuthController.fetchUser();
		} catch (e: any) {
			console.error(e.message);
		}
 }
}

export default new UserController(new UserAPI());
