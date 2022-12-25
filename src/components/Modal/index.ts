import Block from '../../utills/Block';
import template from './modal.hbs';
import styles from './modal.css';
import { Button } from '../Button';
import UserController from '../../modules/controllers/UserController';


interface ModalProps {
	label: string;
	content?: Block;
	events?: {
		submit?: (e: Event) => void;
		click: (e: Event) => void;
	}
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
			events: {
				click: (e: any) => {
					e.preventDefault();
					const formData = new FormData();
					console.log(formData);
					UserController.updateAvatar(formData);

				},
			},
		});
	}

	render() {
		return this.compile(template, { ...this.props, styles });
	}
}
