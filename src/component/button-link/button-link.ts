import Block from '../../utils/block';
import './button-link.css';
import template from './button-link.hbs';

interface IButtonProps {
  title: string,
  events?: any
}
export class ButtonLink extends Block {
  constructor({title, events}: IButtonProps) {
    super('div', {title, events});
  }
  render() {
    return this.compile(template,this.props);
  }
}