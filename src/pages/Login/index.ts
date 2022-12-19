import template from './login.hbs';
import Block from '../../utills/Block';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input/input';
import { Link } from '../../components/Link';
import { renderDOM } from '../../utills/renderDOM';
import { RegisterPage } from '../Register';
import styles from './login.css';
import { validate } from '../../utills/validations';
import { onSubmit } from '../../utills/onSubmit';
import AuthController from '../../modules/controllers/AuthController';
import { SigninData } from '../../modules/api/interfaces/SigninData';

export class LoginPage extends Block {
	constructor() {
		super({});
	}

	init() {
		this.children.button = new Button({
			type: 'submit',
			label: 'Войти',
			stylesName: 'button',
			events: {
				click: (e: any): void => {
					const data = onSubmit(e);
					AuthController.signin!(data as unknown as SigninData);
				},
				},
		});

		this.children.login = new Input({
			type: 'text',
			inputName: 'login',
			className: 'input',
			required: true,
			autofocus: true,
			minLength: 3,
			maxLength: 20,
			inputMode: 'text',
			events: {
				blur: validate,
				focus: validate,
			},
		});

		this.children.password = new Input({
			type: 'password',
			inputName: 'password',
			className: 'input',
			required: true,
			minLength: 8,
			maxLength: 20,
			inputMode: 'text',
			events: {
				blur: validate,
				focus: validate,
			},
		});

		this.children.link = new Link({
			label: 'Ещё не зарегистрированы?',
			route: '/sign-up',
			className: 'formLink',
			events: {
				click: () => {
					const registerPage = new RegisterPage();
					renderDOM('#app', registerPage);
				},
			},
		});
	}

	render() {
		return this.compile(template, { ...this.props, styles });
	}
}
