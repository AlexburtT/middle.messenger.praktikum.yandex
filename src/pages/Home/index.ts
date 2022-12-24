import template from './home.hbs';
import Block from '../../utills/Block';
import { Link } from '../../components/Link';
import styles from './home.css';


export class HomePage extends Block {
	constructor() {
		super({});
	}

	init() {
		this.children.signin = new Link({
			label: 'Жмякни',
			pathTo: '/sign-in',
			className: 'link_button',
		});

		this.children.link = new Link({
			label: '404',
			pathTo: '/error',
			className: 'link',
		});
	}

	render() {
    return this.compile(template, { ...this.props, styles });
  }
}
