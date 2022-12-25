import Block from '../../utills/Block';
import template from './avatar.hbs';
import styles from './avatar.css';

interface AvatarProps {
	srcImg?: string,
	events?: {
		click: (e: Event) => void;
	}
}

export class Avatar extends Block<AvatarProps> {
	constructor(props: AvatarProps) {
		super({ ...props });
	}

	render() {
		return this.compile(template, { ...this.props, styles });
	}
}
