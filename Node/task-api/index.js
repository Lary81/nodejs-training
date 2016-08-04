import express from "express";
import consign from "consign";

const APP = express();

consign()
    .include('models')
    .then('libs/middlewares.js')
    .then('routes')
    .then('libs/boot.js')
    .into(APP);