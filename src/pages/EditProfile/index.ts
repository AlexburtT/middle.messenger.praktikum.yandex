import Block from '../../utills/Block';
import template from './editProfile.hbs';
import styles from './edit.css';
import { Input } from '../../components/Input/input';
import { onSubmit, validate } from '../../utills/validations';
import { Button } from '../../components/Button';

export class EditProfilePage extends Block {
	constructor() {
		super({});
	}

	init() {
		this.children.email = new Input({
			type: 'email',
			inputName: 'email',
			className:'input',
			required: true,
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
			events: {
				blur: validate,
				focus: validate,
			},
		});

		this.children.first_name = new Input({
			type: 'text',
			inputName: 'first_name',
			className: 'input',
			required: true,
			autofocus: true,
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
			events: {
				blur: validate,
				focus: validate,
			},
		});

		this.children.chat_name = new Input({
			type: 'text',
			inputName: 'chat_name',
			className: 'input',
			required: true,
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
