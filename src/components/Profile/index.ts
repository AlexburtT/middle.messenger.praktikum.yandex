import Block from '../../utills/Block';
import template from './profile.hbs';
import styles from './profile.css';


interface ProfileProps {
	name: string,
	label: string,
	value: string | number,
}

export class Profile extends Block<ProfileProps> {
	constructor(props: ProfileProps) {
		super({ ...props });
	}

	protected render(): DocumentFragment {
		return this.compile(template, { ...this.props, styles });
	}

}
