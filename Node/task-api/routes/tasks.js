module.exports = APP => {
    const Tasks = APP.db.models.Tasks;
    APP.route('/tasks')
        .get((req, res) => {
            Tasks.findAll({})
                .then(result => res.json(result)).catch(error => {
                res.status(412).json({msg: error.message});
            });
        })
        .post((req, res) => {
            Tasks.create(req.body).then(result => res.json(result)).catch(error => {
                res.status(412).json({msg: error.message});
            });
        });
    APP.route('/tasks/:id')
        .get((req, resp, next) => {
            Tasks.findOne({where: req.params})
                .then(result => {
                    if (result) {
                        res.json(result);
                    } else {
                        res.sendStatus(404);
                    }
                })
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        })
        .put((req, res) => {
            delete req.body.id;
            Tasks.update(req.body, {where: req.params}).then(result => res.sendStatus(204)).catch(error => {
                res.status(412).json({msg: error.message});
            });

        })
        .delete((req, res) => {
            Tasks.destroy({where: req.params}).then(result => res.sendStatus(204)).catch(error => {
                res.status(412).json({msg: error.message});
            });

        });
};
