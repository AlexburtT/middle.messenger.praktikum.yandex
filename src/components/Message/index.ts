import Block from '../../utills/Block';
import template from './message.hbs';
import styles from './message.css';

export class MessageBlock extends Block {
	constructor() {
		super({});
	}

	render() {
		return this.compile(template, { ...this.props, styles });
	}
}
