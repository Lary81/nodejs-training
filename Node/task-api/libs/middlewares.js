import bodyParser from 'body-parser';
import express from "express";

module.exports = APP => {
    APP.set('json spaces', 4);
    APP.set('port', 3000);
    APP.use(bodyParser.json());
    APP.use(APP.auth.initialize());
    APP.use((req, res, next) => {
        if (req.body) {
            delete req.body.id;
            next();
        }
    });
    APP.use(express.static("public"));
};