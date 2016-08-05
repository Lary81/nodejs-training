module.exports = APP => {
    if (process.env.NODE_ENV !== 'test') {
        APP.db.sequelize.sync().done(() => {
            APP.listen(APP.get('port'), () => console.log('Server is up...'));
        });
    }
};