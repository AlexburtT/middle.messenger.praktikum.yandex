import Block from '../../utills/Block';
import template from './message.hbs';
import styles from './message.css';
import { Input } from '../Input/input';
import { validate } from '../../utills/validations';

export class MessageBlock extends Block {
	constructor() {
		super({});
	}

	init() {
		this.children.message = new Input({
			type: 'text',
			inputName: 'message',
			className: 'sendMessage',
			required: true,
			autofocus: true,
			minLength: 1,
			events: {
				blur: validate,
				focus: validate,
			},
		});
	}

	render() {
		return this.compile(template, { ...this.props, styles });
	}
}
