// Import js file
import {message, messageDOM} from './tools/message';
import './components/footer';
import Creator from './tools/creator';

//Import txt file
import info from './data/title.txt';

// Import scss file
import './sass/index.scss';

message('test import function');
messageDOM(info);
const e1 = new Creator();
e1.addBgc('red');
const e2 = new Creator();
e2.addBgc('blue');
const e3 = new Creator();
e3.addBgc();
e3.showColor();
