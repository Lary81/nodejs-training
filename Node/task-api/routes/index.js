module.exports = APP => {
    APP.get('/', (req, res) => {
        res.json({status: 'Ok'})
    });
};