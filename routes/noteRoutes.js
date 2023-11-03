
import express  from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authenticator } from "../middlewares/authenticator.js";

const noteRouter = express.Router();
noteRouter.use(authenticator)

//Making note router api
noteRouter.get('/' , (req,res) =>{
    res.send({
        message : "All the notes",
        status : 1
    })

})

noteRouter.post('/create', (req,res) =>{

})

export {noteRouter}