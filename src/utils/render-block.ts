export function renderBlock(rootSelector: string, component: any) {
  const root = document.querySelector(rootSelector);
  if (!root) {
    throw new Error("Root not found!");
  }
  root.innerHTML = "";
  root.append(component.getContent()!);
}
