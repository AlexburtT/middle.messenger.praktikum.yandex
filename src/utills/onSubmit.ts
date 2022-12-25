import { Validations } from './validations';

export function onSubmit(e: any) {
	e.preventDefault();

	const inputValue: Record<string, string> = {};
	const inputList = document.querySelectorAll('input');

	const isError: boolean = Array.from(inputList).some((input: Element) => {
		const inputType = input as HTMLInputElement | null;
		const value = inputType!.value;
		const name = inputType!.name;
		return !Validations.INPUTS[name].pattern.test(value);
	});

	if (isError) {
		e.target!.form.nextSibling.textContent = 'Заполните все поля правильно';
		return;
	}

	e.target.form.nextSibling.textContent = '';

	inputList.forEach((input: any) => {
		inputValue[input.name] = input.value;
	});

	return inputValue;

}
