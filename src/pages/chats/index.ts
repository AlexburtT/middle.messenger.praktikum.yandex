import Block from '../../utills/Block';
import template from './chats.hbs';
import styles from './chats.css';
import { NavChatsBlock } from '../../components/NavChats';
import { MessageBlock } from '../../components/Message';

export class ChatsPage extends Block {
	constructor() {
		super({});
	}

	init() {
		this.children.navChatsBlock = new NavChatsBlock();
		this.children.messageBlock = new MessageBlock();
	}

	render() {
		return this.compile(template, { ...this.props, styles });
	}
}



