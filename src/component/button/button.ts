import Handlebars from 'handlebars';
import Block from '../../utils/block';
import template from './button.hbs';
import './button.css';

type ButtonProps ={
  title: string;
  events?: any;
}
export class Button extends Block{

  constructor(props: ButtonProps){
      super('div', props);
  }
  render() {
    return this.compile(template, {...this.props});
  }

}
