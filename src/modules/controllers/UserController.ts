import { UserAPI } from '../api/UserAPI';
import AuthController from './AuthController';


export class UserController {
	constructor(private api: UserAPI) {}



 async updateAvatar(data: FormData) {
		try {
			const response = await this.api.updateAvatar(data);
			await AuthController.fetchUser();
			return response;
		} catch (e: any) {
			console.error(e.message);
			throw (e);
		}
 }
}

export default new UserController(new UserAPI());
