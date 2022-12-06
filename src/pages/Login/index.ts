import template from './login.hbs';
import Block from '../../utills/Block';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input/input';
import { Link } from '../../components/Link';
import { renderDOM } from '../../utills/renderDOM';
import { RegisterPage } from '../Register';
import styles from './login.css';
import { validate, onSubmit } from '../../utills/validations';

export class LoginPage extends Block {
	constructor() {
		super({});
	}

	init() {
		this.children.button = new Button({
			type: 'submit',
			label: 'Войти',
			className: 'button',
			events: {
				click: onSubmit,
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
			events: {
				blur: validate,
				focus: validate,
			},
		});

		this.children.link = new Link({
			label: 'Ещё не зарегистрированы?',
			route: '/registration',
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
