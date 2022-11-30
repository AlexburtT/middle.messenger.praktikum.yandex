import template from './login.hbs';
import Block from '../../utills/Block';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input/input';
import { Link } from '../../components/Link';
import { renderDOM } from '../../utills/renderDOM';
import { RegisterPage } from '../Register';
import Validations from '../../utills/validations';
import styles from './login.css';
import { ChatsPage } from '../Chats';

export class LoginPage extends Block {
	constructor() {
		super({});
	}

	init() {
		this.children.button = new Button({
			type: 'submit',
			label: 'Войти',
			events: {
				click: () => {
					const login = <HTMLInputElement>document.getElementsByName('login')[0];
					console.log(login.value);
					const password = <HTMLInputElement>document.getElementsByName('password')[0];
					console.log(password.value);
					event!.preventDefault();
					const chatsPage = new ChatsPage();
					renderDOM('#app', chatsPage);
				},
			},
		});

		this.children.login = new Input({
			id: 'login',
			type: 'text',
			inputName: 'login',
			className: 'input',
			required: true,
			autocomplete: true,
			autofocus: true,
			minLength: 3,
			maxLength: 20,
			events: {
				blur: function (event: any) {
					const value = event.target.value;

					if ((new Validations).isLogin(value)) {
						console.log('Логин правильный');
					} else {
						console.log('Логин не правильный');
					}
				},
			},
		});


		this.children.password = new Input({
			id: 'password',
			type: 'password',
			inputName: 'password',
			className: 'input',
			required: true,
			autocomplete: true,
			autofocus: false,
			minLength: 8,
			maxLength: 40,
			events: {
				focus: function (event: any) {
					const value = event.target.value;

					if ((new Validations).isPassword(value)) {
						console.log('Пароль правильный');
					} else {
						console.log('Пароль не правильный');
					}
				},
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
					console.log('ссылка');
				},
			},
		});
	}

	render() {
		return this.compile(template, { ...this.props, styles });
	}
}
