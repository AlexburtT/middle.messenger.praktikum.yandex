import Block from '../../../utills/Block';
import template from './itemsChat.hbs';
import styles from './itemsChat.css';

interface ItemsChatProps {
	name: string;
	lastTime: string;
	lastMessage: string;
	alertMsg: number;
}

export class ItemsChat extends Block {
	constructor(props: ItemsChatProps) {
		super({ ...props });
	}

	render() {
		return this.compile(template, { ...this.props, styles });
	}
}
