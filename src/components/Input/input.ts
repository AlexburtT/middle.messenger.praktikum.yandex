import Block from '../../utills/Block';
import template from './input.hbs';
import styles from './input.css';


interface InputProps {
	type: string;
	inputName: string;
	placeholder?: string;
	required: boolean;
	autofocus?: boolean;
	className: string;
	minLength?: number;
	maxLength?: number;
	events?: any;
	inputMode: string;
}

export class Input extends Block {
	constructor(props: InputProps) {
		super({ ...props });
	}

	render() {
		return this.compile(template, { ...this.props, styles });
	}
}
