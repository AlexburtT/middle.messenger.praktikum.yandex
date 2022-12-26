import Block from '../../utills/Block';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input/input';
import template from './register.hbs';
import { validate } from '../../utills/validations';
import AuthController from '../../modules/controllers/AuthController';
import { SignupData } from '../../modules/api/interfaces/interfaceAPI';
import { onSubmit } from '../../utills/onSubmit';

export class RegisterPage extends Block {
	constructor() {
		super({});
	}

	init() {
		this.children.button = new Button({
			type: 'submit',
			label: 'Создать аккаунт',
			className: 'button',
			events: {
					click: (e: any) => {
						const data = onSubmit(e);
						AuthController.signup!(data as unknown as SignupData);
					},
			},
		});

		this.children.first_name = new Input({
			type: 'text',
			inputName: 'first_name',
			className: 'input',
			required: true,
			autofocus: true,
			inputMode: 'text',
			events: {
				blur: validate,
				focus: validate,
			},
		});

		this.children.second_name = new Input({
			type: 'text',
			inputName: 'second_name',
			className: 'input',
			required: true,
			inputMode: 'text',
			events: {
				blur: validate,
				focus: validate,
			},
		});

		this.children.login = new Input({
			type: 'text',
			inputName: 'login',
			className: 'input',
			required: true,
			minLength: 3,
			maxLength: 20,
			inputMode: 'text',
			events: {
				blur: validate,
				focus: validate,
			},
		});

		this.children.email = new Input({
			type: 'email',
			inputName: 'email',
			className:'input',
			required: true,
			inputMode: 'email',
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
			maxLength: 40,
			inputMode: 'text',
			events: {
				blur: validate,
				focus: validate,
			},
		});

		this.children.phone = new Input({
			type: 'tel',
			inputName: 'phone',
			className: 'input',
			required: true,
			minLength: 10,
			maxLength: 15,
			inputMode: 'tel',
			events: {
				blur: validate,
				focus: validate,
			},
		});
	}

	render() {
		return this.compile(template, { ...this.props });
	}
}
