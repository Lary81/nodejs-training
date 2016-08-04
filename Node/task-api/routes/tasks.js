module.exports = APP => {
    const  Tasks = APP.models.tasks;
    APP.get('/tasks', (req, res) => {
        Tasks.findAll({}, (tasks) => {
            res.json({tasks: tasks});
        });
    });
};