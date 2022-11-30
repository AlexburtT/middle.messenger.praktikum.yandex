import Block from '../../utills/Block';
import template from './message.hbs';
import styles from './message.css';
import { Input } from '../Input/input';
import Validations from '../../utills/validations';

export class MessageBlock extends Block {
	constructor() {
		super({});
	}

	init() {
		this.children.sendMessageInput = new Input({
			id: 'message',
			type: 'text',
			inputName: 'message',
			className: 'sendMessage',
			required: true,
			autocomplete: false,
			minLength: 1,
			events: {
				blur: function (event: any) {
					const value = event.target.value;

					if ((new Validations).isMessage(value)) {
						console.log(value);
					} else {
						console.log('Нет сообщения!!!');
					}
				},
			},
		});
	}

	render() {
		return this.compile(template, { ...this.props, styles });
	}
}
