import template from './button.hbs';
import Block from '../../utills/Block';
import styles from './button.css';

interface ButtonProps {
	type?: string;
  label: string;
	className: string;
  events?: {
		click: (e: Event) => void,
	};
}

export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super({ ...props });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
