export class Validations {
	public static INPUTS: Record<string,
		{
		pattern: RegExp;
		errorMsg: string;
	}
	> = {
	login: {
		pattern: /^(?=.*[a-zA-Z])([a-zA-Z0-9-_]){3,20}$/,
		errorMsg: 'от 3 до 20 символов, латиница, может содержать цифры, ' +
			'но не состоять из них, без пробелов, без спецсимволов ' +
			'(допустимы дефис и нижнее подчёркивание)',
	},
		password: {
			pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
			errorMsg: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
		},
		oldPassword: {
			pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
			errorMsg: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
		},
		email: {
			pattern: /.+@[^@]+[a-z]+\.[^@]{2,}$/,
			errorMsg: 'латиница, может включать цифры и спецсимволы вроде дефиса, ' +
				'обязательно должна быть «собака» (@) ' +
				'и точка после неё, но перед точкой обязательно должны быть буквы',
		},
		first_name: {
			pattern: /^[А-ЯЁA-Z][А-ЯЁA-Zа-яёa-z-]+$/,
			errorMsg: 'латиница или кириллица, первая буква должна быть заглавной, ' +
				'без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
		},
		second_name: {
			pattern: /^[А-ЯЁA-Z][А-ЯЁA-Zа-яёa-z-]+$/,
			errorMsg: 'латиница или кириллица, первая буква должна быть заглавной, ' +
				'без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
		},
		chat_name: {
			pattern: /^[А-ЯЁA-Z][А-ЯЁA-Zа-яёa-z-]+$/,
			errorMsg: 'латиница или кириллица, первая буква должна быть заглавной, ' +
				'без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
		},
		phone: {
			pattern: /^[+-d]?\d{10,15}$/,
			errorMsg: 'от 10 до 15 символов, состоит из цифр, может начинается с плюса',
		},
		message: {
			pattern: /(.|\s)*\S(.|\s)*/,
			errorMsg: 'Сообщение не может быть пустым',
		},
	};
}

  const validate = ( event: any ) => {
	const value = event.target.value;
	const nameInput = event.target.name;
	const isValid = Validations.INPUTS[nameInput].pattern.test(value);
	const message = Validations.INPUTS[nameInput].errorMsg;

	if (!isValid) {
		event.target.nextSibling.textContent = message;
	} else {
		event.target.nextSibling.textContent = '';
	}
};

export { validate };
