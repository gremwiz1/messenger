import Block from '../../utils/block';
import './button.css';

interface IButtonProps {
  title: string,
  events?: any
}
export class Button extends Block<IButtonProps> {
  constructor({title, events}: IButtonProps) {
    super({title, events});
  }
  render() {
   return `
   <button class="form__button" type="submit">{{title}}</button>
  `;
  }
}