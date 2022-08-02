import { renderBlock } from '../../utils/render-block';
import Error from '../../component/error';

const notFoundPage = new Error({
 code: '404',
 text: 'Не туда попали',
 linkText: 'Назад к чатам',
 link: '/'
});

renderBlock('#app', notFoundPage);