import Block from '../../utils/block';
import './error.css';

interface IErrorProps {
  code: string,
  text: string,
  linkText: string,
  link: string
}
export class Error extends Block<IErrorProps> {
  constructor({code, text, linkText, link}: IErrorProps) {
    super({code, text, linkText, link});
  }
  render() {
   return `
  <div class="page">
    <main class="not-found">
      <h1 class="not-found__title">{{code}}</h1>
      <p class="not-found__text">{{text}}</p>
      <a class="not-found__link" href="{{link}}">{{linkText}}</a>
    </main>

  </div>
  `;
  }
}