import template from './link.hbs';
import Block from '../../utills/Block';
import styles from './link.css';

interface LinkProps {
	label: string;
	route: string;
	className: string;
	events?: {
		click: () => void;
	}
}

export class Link extends Block {
	constructor(props: LinkProps) {
		super({ ...props });
	}

	render() {
		return this.compile(template, { ...this.props, styles });
	}
}
