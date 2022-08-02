import Block from './block';
type T = any;
export function renderBlock(rootSelector: string, component: Block<T>) {
  const root = document.querySelector(rootSelector);
  if (!root) {
    throw new Error('Root not found!');
  }
  root.innerHTML = '';
  root.append(component.getContent()!);
}