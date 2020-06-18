import photo from '../assets/img/photo.jpg';

import $ from 'jquery';

export default (tag) => {
  $(tag).append(`<img src=${photo}>`);
};
