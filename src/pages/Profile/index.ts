import Block from '../../utills/Block';
import template from './profile.hbs';
import styles from './profile.hbs';

export class ProfilePage extends Block {
	constructor() {
		super({});
	}

	render() {
		return this.compile(template, { ...this.props, styles });
	}
}
