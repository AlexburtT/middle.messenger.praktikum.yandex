import template from './home.hbs';
import Block from '../../utills/Block';
import { Button } from '../../components/Button';
import { Link } from '../../components/Link';
import { renderDOM } from '../../utills/renderDOM';
import { LoginPage } from '../Login';
import { ErrorPage } from '../Error';

export class HomePage extends Block {
	constructor() {
		super({});
	}

	init() {
		this.children.button = new Button({
			type: 'button',
			label: 'Жмякни',
			events: {
				click: () => {
					const loginPage = new LoginPage();
					renderDOM('#app', loginPage);
				},
			},
		});

		this.children.link = new Link({
			label: '404',
			route: '/error',
			className: 'homeLink',
			events: {
				click: () => {
					const errorPage = new ErrorPage();
					renderDOM('#app', errorPage);
					console.log('ссылка');
				},
			},
		});
	}

	render() {
    return this.compile(template, { ...this.props });
  }
}
