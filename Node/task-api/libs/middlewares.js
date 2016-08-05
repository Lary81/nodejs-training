import bodyParser from 'body-parser';
import express from "express";
import cors from 'cors';
import morgan from 'morgan';
import logger from './logger.js';

module.exports = APP => {
    APP.set('json spaces', 4);
    APP.set(cors({
        origin: ['http://localhost:3001'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));
    APP.set('port', 3000);
    APP.use(morgan('common', {
        stream: {
            write: (message) => {
                logger.info(message);
            }
        }
    }));
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