import Block from '../../utils/block';
import './chat.css';
import template from './chat.hbs';

interface IChat {
  imageUrl: string,
  title: string,
  lastUserName: string,
  lastMessage: string,
  timeLastMessage: string,
  isNewMessages: boolean,
  countNewMessages: number
}
export class Chat extends Block {
  constructor(props: IChat) {
    super('div',props);
  }
  render() {
   return this.compile(template,this.props);
  }
}