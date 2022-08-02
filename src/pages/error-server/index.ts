import { renderBlock } from '../../utils/render-block';
import Error from '../../component/error';

const errorPage = new Error({
 code: '500',
 text: 'Мы уже фиксим',
 linkText: 'Назад к чатам',
 link: '/'
});

renderBlock('#app', errorPage);