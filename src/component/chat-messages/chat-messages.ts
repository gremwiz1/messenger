import Block from '../../utils/block';
import './chat.css';
import template from './chat.hbs';

interface IChatMessages {
  isMyMessage: Boolean,
  textMessage: string,
  timeMessage: string
}
export class ChatMessages extends Block {
  constructor(props: IChatMessages) {
    super('div',props);
  }
  render() {
   return this.compile(template,this.props);
  }
}