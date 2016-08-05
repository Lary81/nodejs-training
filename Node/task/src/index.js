import App from './app.js';

window.onload = () => {
    let main = document.querySelector('#main');
    new App(main).init();
};