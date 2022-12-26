import Block from '../../utills/Block';
import template from './modal.hbs';
import styles from './modal.css';
import { Button } from '../Button';


interface ModalProps {
	label: string;
	content: Block;
	events?: {
		close: () => void;
	};
}

export class Modal extends Block<ModalProps> {
	constructor(props: ModalProps) {
		super({ ...props });
	}

	init() {
		this.children.save = new Button({
			type: 'submit',
			label: 'Сохранить',
			className: 'button',
		});
	}

	render() {
		return this.compile(template, { ...this.props, styles });
	}
}
