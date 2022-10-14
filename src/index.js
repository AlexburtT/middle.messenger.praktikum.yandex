import { sum } from './modules/sum';

const root = document.querySelector('#root');
root.textContent = sum(100, -1).toString(); 