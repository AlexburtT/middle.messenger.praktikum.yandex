import Block from '../../utills/Block';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input/input';
import template from './register.hbs';
import Validations from '../../utills/validations';

export class RegisterPage extends Block {
	constructor() {
		super({});
	}

	init() {
		this.children.button = new Button({
			label: 'Создать аккаунт',
			events: {
				click: () => {
					event!.preventDefault();
					console.log('Создали');
				},
			},
		});

		this.children.first_name = new Input({
			id: 'first_name',
			type: 'text',
			inputName: 'first_name',
			className: 'input',
			required: true,
			autocomplete: true,
			events: {
				blur: function (event: any) {
					const value = event.target.value;

					if ((new Validations).isFirstName(value)) {
						console.log(value);
					} else {
						console.log('Имя не правильно');
					}
				},
			},
		});

		this.children.second_name = new Input({
			id: 'second_name',
			type: 'text',
			inputName: 'second_name',
			className: 'input',
			required: true,
			autocomplete: true,
			events: {
				blur: function (event: any) {
					const value = event.target.value;

					if ((new Validations).isSecondName(value)) {
						console.log(value);
					} else {
						console.log('Фамилия не правильно');
					}
				},
			},
		});

		this.children.login = new Input({
			id: 'login',
			type: 'text',
			inputName: 'login',
			className: 'input',
			required: true,
			autocomplete:true,
			minLength: 3,
			maxLength: 20,
			events: {
				blur: function (event: any) {
					const value = event.target.value;

					if ((new Validations).isLogin(value)) {
						console.log(value);
					} else {
						console.log('Логин не правильный');
					}
				},
			},
		});

		this.children.email = new Input({
			id: 'email',
			type: 'email',
			inputName: 'email',
			className:'input',
			required: true,
			autocomplete: true,
			events: {
				blur: function (event: any) {
					const value = event.target.value;

					if ((new Validations).isEmail(value)) {
						console.log(value);
					} else {
						console.log('E-mail не правильный');
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
			minLength: 8,
			maxLength: 40,
			events: {
				blur: function (event: any) {
					const value = event.target.value;

					if ((new Validations).isPassword(value)) {
						console.log(value);
					} else {
						console.log('Пароль не правильный');
					}
				},
			},
		});

		this.children.phone = new Input({
			id: 'phone',
			type: 'tel',
			inputName: 'phone',
			className: 'input',
			required: true,
			autocomplete: true,
			minLength: 10,
			maxLength: 15,
			events: {
				blur: function (event: any) {
					const value = event.target.value;

					if ((new Validations).isPhone(value)) {
						console.log(value);
					} else {
						console.log('Телефон не правильный');
					}
				},
			},
		});
	}

	render() {
		return this.compile(template, { ...this.props });
	}
}
