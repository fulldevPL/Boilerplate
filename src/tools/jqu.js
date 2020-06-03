import photo from "../../public/img/photo.jpg";

import $ from "jquery";

export default (tag) => {
  $(tag).append(`<img src=${photo}>`);
};
