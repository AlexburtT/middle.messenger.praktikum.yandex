import template from './link.hbs';
import Block from '../../utills/Block';
import styles from './link.css';
import { PropsWithRouter, withRouter } from '../../modules/hocsApi/withRouter';

interface LinkProps extends PropsWithRouter {
	label: string;
	pathTo: string;
	className: string;
	events?: {
		click: () => void;
	}
}

class LinkBase extends Block<LinkProps> {
	constructor(props: LinkProps) {
		super({
			...props,
			events: {
				click: () => this.navigate(),
			},
		});
	}

	navigate() {
		this.props.router.go(this.props.pathTo);
	}

	render() {
		return this.compile(template, { ...this.props, styles });
	}
}

export const Link = withRouter(LinkBase);
