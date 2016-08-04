module.exports = APP => {
    APP.listen(APP.get('port'), () => console.log('Server is up...'));
};