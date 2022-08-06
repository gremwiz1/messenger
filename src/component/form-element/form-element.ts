import Block from '../../utils/block';
import './form-element.css';
import template from './form-element.hbs';

interface IFormElementProps {
  labelText?: string,
  typeInput: 'text' | 'email' | 'password',
  idInput: string,
  valueInput?: string,
  nameInput: string,
  placeholderInput: string,
  classNameInput: string
}
export class FormElement extends Block {
  constructor({ labelText, typeInput, idInput, valueInput, nameInput, placeholderInput, classNameInput }: IFormElementProps) {
    super('div',{ labelText, typeInput, idInput, valueInput, nameInput, placeholderInput, classNameInput });
  }
  render() {
    console.log('render form-element');
  return this.compile(template,this.props)
  }
}
