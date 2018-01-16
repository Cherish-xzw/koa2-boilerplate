// import stylesheets
import '../stylesheets/application.scss';

import $ from 'jquery';
window.$ = $;
window.jQuery = $;

import './common';

// import page scripts
import Home from './feature/home';
import About from './feature/about';

$(document).ready(() => {
  const page = $('body')
    .children()
    .first()
    .attr('data-page');
  if (!page) {
    return false;
  }
  switch (page) {
    case 'home':
      new Home();
      break;
    case 'about':
      new About();
      break;
    default:
      throw new Error('No page found.');
  }
});
