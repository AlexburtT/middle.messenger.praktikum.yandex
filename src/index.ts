import { HomePage } from './pages/Home';
import Router from './utills/Router';
import { LoginPage } from './pages/Login';
import { RegisterPage } from './pages/Register';
import { ChatsPage } from './pages/chats';
import { ErrorPage } from './pages/Error';
import AuthController from './modules/controllers/AuthController';
import { SettingsPage } from './pages/Settings';

enum Routes {
	Index = '/',
	Login = '/sign-in',
	Register = '/sign-up',
	Settings = '/settings',
	Messenger = '/messenger',
	Error = '/error',
}

document.addEventListener('DOMContentLoaded', async () => {
	Router
		.use(Routes.Index, HomePage)
		.use(Routes.Login, LoginPage)
		.use(Routes.Register, RegisterPage)
		.use(Routes.Settings, SettingsPage)
		.use(Routes.Messenger, ChatsPage)
		.use(Routes.Error, ErrorPage)
		.start();

	let isProtectedRoute = true;

	switch (window.location.pathname) {
		case Routes.Index:
		case Routes.Register:
		case Routes.Login:
			isProtectedRoute = false;
			break;
	}

	try {
		await AuthController.fetchUser();
		Router.start();
		if (!isProtectedRoute) {
			Router.go(Routes.Settings);
		}

	} catch (e) {
		Router.start();

		if (isProtectedRoute) {
			Router.go(Routes.Index);
		}
	}
});
