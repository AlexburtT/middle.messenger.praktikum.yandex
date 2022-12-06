import Block from '../../utills/Block';
import template from './error.hbs';

export class ErrorPage extends Block {
	constructor() {
		super({});
	}

	render() {
		return this.compile(template, { ...this.props });
	}
}
