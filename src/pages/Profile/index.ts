import Block from '../../utills/Block';
import template from './profile.hbs';
import styles from './profile.css';
import { Input } from '../../components/Input/input';
import { Button } from '../../components/Button';
import { renderDOM } from '../../utills/renderDOM';
import { EditProfilePage } from '../EditProfile';
import { EditPasswordPage } from '../EditPassword';
import {onSubmit} from "../../utills/onSubmit";
import AuthController from "../../modules/controllers/AuthController";
import {SigninData} from "../../modules/api/interfaces/SigninData";

export class ProfilePage extends Block {
	constructor() {
		super({});
	}

	init() {
		this.children.avatar = new Input({
			type: 'file',
			inputName: 'avatar',
			className: 'fotoUserInput',
			required: false,
		});

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

		this.children.button = new Button({
			type: 'submit',
			label: 'Изменить',
			className: 'button',
			events: {
				click: () => {
					const editProfilePage = new EditProfilePage();
					renderDOM('#app', editProfilePage);
				},
			},
		});

		this.children.buttonPass = new Button({
			type: 'submit',
			label: 'Изменить',
			className: 'button',
			events: {
				click: () => {
					const editPasswordPage = new EditPasswordPage();
					renderDOM('#app', editPasswordPage);
				},
			},
		});
	}

	render() {
		return this.compile(template, { ...this.props, styles });
	}
}
