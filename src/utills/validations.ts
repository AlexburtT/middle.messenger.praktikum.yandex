export default class Validations {
	isLogin = (value: string) => (/^(?=.*[a-zA-Z])([a-zA-Z0-9-_]){3,20}$/.test(value));
	isPassword = (value: string) => (/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/.test(value));
	isOldPassword = (value: string) => (/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/.test(value));
	isEmail = (value: string) => (/.+@[^@]+[a-z]+\.[^@]{2,}$/.test(value));
	isFirstName = (value: string) => (/^[А-ЯЁA-Z][А-ЯЁA-Zа-яёa-z-]+$/.test(value));
	isSecondName = (value: string) => (/^[А-ЯЁA-Z][А-ЯЁA-Zа-яёa-z-]+$/.test(value));
	isPhone = (value: string) => (/^[+-d]?\d{10,15}$/.test(value));
	isMessage = (value: string) => (/(.|\s)*\S(.|\s)*/.test(value));
}
