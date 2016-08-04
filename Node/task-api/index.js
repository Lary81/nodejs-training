import express from "express";
import consign from "consign";

const APP = express();

consign()
    .include('libs/config.js')
    .then('db.js')
    .then('libs/middlewares.js')
    .then('routes')
    .then('libs/boot.js')
    .into(APP);