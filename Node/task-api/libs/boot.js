module.exports = APP => {
    APP.db.sequelize.sync().done(() => {
        APP.listen(APP.get('port'), () => console.log('Server is up...'));
    });
};