module.exports = APP => {
    return {
        findAll : (params, callback) => {
            return callback([
                {title: 'Buy some milk'},
                {title: 'Learn JS'}
            ]);
        }
    };
};