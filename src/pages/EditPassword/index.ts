import Block from '../../utills/Block';
import template from './editPassword.hbs';
import styles from './editPassword.css';
import { Input } from '../../components/Input/input';
import { onSubmit, validate } from '../../utills/validations';
import { Button } from '../../components/Button';

export class EditPasswordPage extends Block {
	constructor() {
		super({});
	}

	init() {
		this.children.oldPassword = new Input({
			type: 'password',
			inputName: 'oldPassword',
			className: 'input',
			required: true,
			minLength: 8,
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

		this.children.password_2 = new Input({
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

		this.children.button = new Button({
			type: 'submit',
			label: 'Сохранить',
			className: 'button',
			events: {
				click: onSubmit,
			},
		});
	}

	render() {
		return this.compile(template, { ...this.props, styles });
	}
}
