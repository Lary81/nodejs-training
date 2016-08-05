import Signin from './components/signin'

class App {
    constructor(body) {
        this.signin = new Signin(body);
    }

    init() {
        this.signin.render();
        this.signin.on('error', () => alert('Authentication error'));
        this.signin.on('signin', (token) => alert(token));
    }
}

module.exports = App;