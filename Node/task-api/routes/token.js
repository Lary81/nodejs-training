import jwt from 'jwt-simple';

module.exports = APP => {
    const cfg = APP.libs.config;
    const Users = APP.db.models.Users;
    APP.post('/token', (req, res) => {
        if (req.body.email && req.body.password) {
            let email = req.body.email;
            let password = req.body.password;
            Users.findOne({where: {email: email}}).then(user => {
                if (Users.isPassword(user.password, password)) {
                    let payload = {id: user.id};
                    res.json({
                        token: jwt.encode(payload, cfg.jwtSecret)
                    });
                } else {
                    res.sendStatus(401);
                }
            }).catch(error => res.sendStatus(401));
        } else {
            res.sendStatus(401);
        }
    });
};