module.exports = APP => {
    const Tasks = APP.db.models.Tasks;
    APP.get("/tasks", (req, res) => {
        Tasks.findAll({}).then(tasks => {
            res.json({tasks: tasks});
        });
    });
};
