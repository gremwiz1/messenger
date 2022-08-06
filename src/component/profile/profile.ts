import './profile.css';
import Block from '../../utils/block';
import template from './profile.hbs';
import FormElement from '../../component/form-element';

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
  FormElement4: FormElement,
  FormElement5: FormElement,
  FormElement6: FormElement,
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