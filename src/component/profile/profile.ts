import './profile.css';
import Block from '../../utils/block';
import template from './profile.hbs';
import FormElement from '../form-element';
import Button from '../button';
import ButtonLink from '../button-link';

interface IProfile {
  email: string,
  login: string,
  firstName: string,
  secondName: string,
  nickName: string,
  phone: string,
  FormElement1: FormElement,
  FormElement2: FormElement,
  FormElement3: FormElement,
  FormElement4?: FormElement,
  FormElement5?: FormElement,
  FormElement6?: FormElement,
  ButtonSubmit: Button,
  ButtonLink?: ButtonLink,
}
export class Profile extends Block {
  constructor(props: IProfile) {
    super('div',{...props})
  }
  render() {
    console.log('render profile')
    return this.compile(template,this.props)

  }
}