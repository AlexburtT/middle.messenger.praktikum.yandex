import { HomePage } from './pages/Home';
import Router from './utills/Router';
import { LoginPage } from './pages/Login';
import { RegisterPage } from './pages/Register';
import { ProfilePage } from './pages/Profile';
import { ChatsPage } from './pages/chats';
import { ErrorPage } from './pages/Error';

enum Routes {
	Index = '/',
	Login = '/sign-in',
	Register = '/sign-up',
	Profile = '/settings',
	Messenger = '/messenger',
	Error = '/error',
}

document.addEventListener('DOMContentLoaded', async () => {
	Router
		.use(Routes.Index, HomePage)
		.use(Routes.Login, LoginPage)
		.use(Routes.Register, RegisterPage)
		.use(Routes.Profile, ProfilePage)
		.use(Routes.Messenger, ChatsPage)
		.use(Routes.Error, ErrorPage)
		.start();

	// let isProtectedRoute = true;
	//
	// switch (window.location.pathname) {
	// 	case Routes.Index:
	// 	case Routes.Register:
	// 		isProtectedRoute = false;
	// 		break;
	// }
	//
	// try {
	// 	await AuthController.fetchUser();
	//
	// 	Router.start();
	//
	// 	if (!isProtectedRoute) {
	// 		Router.go(Routes.Profile);
	// 	}
	// } catch (e) {
	// 	Router.start();
	//
	// 	if (isProtectedRoute) {
	// 		Router.go(Routes.Index);
	// 	}
	// }
});
