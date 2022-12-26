import Block from '../../utills/Block';
import template from './settings.hbs';
import styles from './settings.css';
import { Button } from '../../components/Button';
import AuthController from '../../modules/controllers/AuthController';
import { withStore } from '../../modules/hocsApi/withStore';
import { Avatar } from '../../components/Avatar';
import { IUserInfo } from '../../modules/api/interfaces/interfaceAPI';
import { Profile } from '../../components/Profile';
import { Modal } from '../../components/Modal';
import { Input } from '../../components/Input/input';
import UserController from '../../modules/controllers/UserController';

interface SettingsProps extends IUserInfo {}

const userFields = ['first_name', 'second_name', 'display_name', 'login',
	'email', 'phone'] as Array<keyof SettingsProps>;

const labelFields = ['Имя', 'Фамилия', 'Имя в чате', 'Логин',
	'E-mail', 'Телефон'];


class SettingsPageBase extends Block<SettingsProps> {
	init() {
		this.children.fields = userFields.map((name, index) => {
			const label = labelFields[index];
			return new Profile({ name, label: label, value: this.props[name] });
		});

		this.children.logOut = new Button({
			type: 'button',
			label: 'Выйти',
			className: 'button_outline',
			events: {
				click: (): void => {
					AuthController.logout!();
				},
			},
		});
		this.children.avatar = new Avatar({
			srcImg: `https://ya-praktikum.tech/api/v2/resources${this.props.avatar}`,
			events: {
				click: () => {
					const dialog = document.querySelector('dialog');
					dialog!.showModal();
				},
			},
		});

		this.children.editProfile = new Button({
			label: 'Изменить личные данные',
			className: 'button_link',
		});

		this.children.editPassword = new Button({
			label: 'Изменить пароль',
			className: 'button_link',
		});

		this.children.modal = new Modal({
			label: 'аватарку',
			content: new Input({
				type: 'file',
				inputName: 'avatar',
				className: 'input',
			}),
			events: {
				close: () => {
					const input: any = document.querySelector('.input');
					const file = Object(input)!.files[0];
					const formData = new FormData();

					formData.append('avatar', file);
					if (formData) {
						UserController.updateAvatar(formData);
					}
				},
			},
		});
	}

	protected componentDidUpdate(oldProps: SettingsProps, newProps: SettingsProps): boolean {

		this.children.fields = userFields.map((name, index) => {
			const label = labelFields[index];
			return new Profile({ name, label: label, value: newProps[name] });
		});

		(this.children.avatar as Avatar).setProps({
			srcImg: `https://ya-praktikum.tech/api/v2/resources${this.props.avatar}`,
		});

		return super.componentDidUpdate(oldProps, newProps);
	}

	render() {
		return this.compile(template, { ...this.props, styles });
	}

}

const withUser = withStore((state) => (state.user || { isLoading: true }));

export const SettingsPage = withUser(SettingsPageBase);
