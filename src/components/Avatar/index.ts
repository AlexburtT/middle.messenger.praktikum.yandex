import Block from '../../utills/Block';
import template from './avatar.hbs';
import styles from './avatar.css';

interface AvatarProps {
	src: string,
	alt: string,
}

export class Avatar extends Block<AvatarProps> {
	constructor(props: AvatarProps) {
		super({ ...props });
	}

	render() {
		return this.compile(template, { ...this.props, styles });
	}
}
