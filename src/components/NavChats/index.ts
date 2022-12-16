import Block from '../../utills/Block';
import template from './navChats.hbs';
import styles from './navChats.css';
import { Input } from '../Input/input';
import { ItemsChat } from './itemsChat';
import { Link } from '../Link';
import { ProfilePage } from '../../pages/Profile';
import { renderDOM } from '../../utills/renderDOM';

export class NavChatsBlock extends Block {
	constructor() {
		super({});
	}

	init() {
		this.children.inputSearch = new Input({
			id: 'inputSearch',
			type: 'search',
			placeholder: 'поиск',
			inputName: 'searchUser',
			className: 'inputSearchUser',
			required: false,
			autocomplete: false,
		});

		const itemsChatUser: any = [];
		chats.list.forEach(function (value, _index, _array) {
			itemsChatUser.push(new ItemsChat(value));
		});

		this.children.itemsChatUser = itemsChatUser;

		this.children.linkProfile = new Link({
			label: 'АВ',
			route: '/settings',
			className: 'linkAvatarUser',
		});
	}

	render() {
		return this.compile(template, { ...this.props, styles });
	}
}

const chats = {
	list: [
		{
			name: 'Илья',
			lastMessage: 'Друзья, у меня для вас особенный выпуск новостей!...',
			lastTime: '15:12',
			alertMsg: 3,
		},
		{
			name: 'тет-а-теты',
			lastMessage: 'И Human Interface Guidelines и Material Design рекомендуют...',
			lastTime: 'ср',
			alertMsg: 0,
		},
		{
			name: 'Design Destroyer',
			lastMessage: 'В 2008 году художник Jon Rafman начал собирать...',
			lastTime: '5:12',
			alertMsg: 0,
		},
	],
};

