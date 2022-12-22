import Block from '../../utills/Block';
import template from './settings.hbs';
import styles from './settings.css';
import { Button } from '../../components/Button';
import AuthController from '../../modules/controllers/AuthController';
import { withStore } from '../../modules/hocsApi/withStore';
import { Avatar } from '../../components/Avatar';
import { IUser } from '../../modules/api/interfaces/UserData';
import { Profile } from '../../components/Profile';

interface SettingsProps extends IUser {}

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
			className: 'button',
			events: {
				click: (): void => {
					AuthController.logout!();
				},
			},
		});
		this.children.avatar = new Avatar({
			src: `https://ya-praktikum.tech/api/v2/resources${this.props.avatar}`,
			alt: 'аватар',
		});
	}

	protected componentDidUpdate(oldProps: SettingsProps, newProps: SettingsProps): boolean {

		this.children.fields = userFields.map((name, index) => {
			const label = labelFields[index];
			return new Profile({ name, label: label, value: newProps[name] });
		});

		(this.children.avatar as Avatar).setProps({
			src: `https://ya-praktikum.tech/api/v2/resources${this.props.avatar}`,
		});

		return super.componentDidUpdate(oldProps, newProps);
	}

	render() {
		return this.compile(template, { ...this.props, styles });
	}

}

const withUser = withStore((state) => (state.user || { isLoading: true }));

export const SettingsPage = withUser(SettingsPageBase);
