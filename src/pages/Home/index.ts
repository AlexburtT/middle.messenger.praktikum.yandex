import template from './home.hbs';
import Block from '../../utills/Block';
import { Link } from '../../components/Link';


export class HomePage extends Block {
	constructor() {
		super({});
	}

	init() {
		this.children.signin = new Link({
			label: 'Жмякни',
			pathTo: '/sign-in',
			className: 'button',
		});

		this.children.link = new Link({
			label: '404',
			pathTo: '/error',
			className: 'homeLink',
		});
	}

	render() {
    return this.compile(template, { ...this.props });
  }
}
