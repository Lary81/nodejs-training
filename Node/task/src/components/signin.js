import TaskApi from '../task.js';
import Template from '../templates/signin.js';

class Signin extends TaskApi {
    constructor(body) {
        super();
        this.body = body;
    }

    render() {
        this.body.innerHTML = Template.render();
        this.body.querySelector('#email').focus();
        this.addEventListener();
    }

    addEventListener() {
        const form = this.body.querySelector('#signin');
        form.addEventListener('click', (e) => {
            e.preventDefault();
            let email = document.querySelector('#email').value;
            let password = document.querySelector('#password').value;
            let config = {
                method: 'POST',
                url: `${this.URL}/token`,
                json: true,
                body: {
                    email: email,
                    password: password
                }
            };
            this.request(config, (err, resp, data) => {
                if (err || resp.status === 401)     {
                    this.emit('error', err);
                } else {
                    this.emit('signin', data.token);
                }
            });
        });
    }

}

module.exports = Signin;