import Block from '../../utills/Block';
import template from './profile.hbs';
import styles from './profile.css';

import { Button } from '../../components/Button';

import AuthController from '../../modules/controllers/AuthController';
import { withStore } from '../../modules/hocsApi/withStore';


class ProfilePageBase extends Block {
	init() {
		// AuthController.fetchUser!();

		this.children.logOut = new Button({
			type: 'button',
			label: 'Выйти',
			className: 'button',
			events: {
				click: (): void => {
					AuthController.logout!();
				},
			},
		});

		// this.children.button = new Button({
		// 	type: 'submit',
		// 	label: 'Изменить',
		// 	className: 'button',
		// 	events: {
		// 		click: () => {
		// 			const editProfilePage = new EditProfilePage();
		// 			renderDOM('#app', editProfilePage);
		// 		},
		// 	},
		// });
		//
		// this.children.buttonPass = new Button({
		// 	type: 'submit',
		// 	label: 'Изменить',
		// 	className: 'button',
		// 	events: {
		// 		click: () => {
		// 			const editPasswordPage = new EditPasswordPage();
		// 			renderDOM('#app', editPasswordPage);
		// 		},
		// 	},
		// });
	}

	render() {
		return this.compile(template, { ...this.props, styles });
	}
}


const withUser = withStore((state) => (state.user || { isLoading: true }));

export const ProfilePage = withUser(ProfilePageBase);
