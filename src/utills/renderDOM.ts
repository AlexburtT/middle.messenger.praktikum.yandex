import Block from './Block';

export function renderDOM(rootSelector: string, block: Block) {
  const root = document.querySelector(rootSelector);

  if (!root) {
    throw new Error(`root not found by selector "${rootSelector}"`);
  }

	block.dispatchComponentDidMount();
  root.textContent = '';
  root.append(block.getContent()!);
	return root;
}
