import Block from '../../utills/Block';
import template from './input.hbs';
import styles from './input.css';


interface InputProps {
	id: string;
	type: string;
	placeholder?: string;
	inputName: string;
	className: string;
	required: boolean;
	autocomplete?: boolean;
	autofocus?: boolean;
	minLength?: number;
	maxLength?: number;
	events?: any;
}

export class Input extends Block {
	constructor(props: InputProps) {
		super({ ...props });
	}

	render() {
		return this.compile(template, { ...this.props, styles });
	}
}
