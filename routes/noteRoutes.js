
import express  from "express";
import {noteModel} from "../models/noteModel.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authenticator } from "../middlewares/authenticator.js";

const noteRouter = express.Router();
noteRouter.use(authenticator)

//Making note router api
noteRouter.get('/' , async(req,res) =>{
    //finding the data usind the user id with the help of headers token
    let token = jwt.verify(token,"shaikh" , async(err,decode) =>{

        try {
            let data = await noteModel.find({user:decode.userId})
            res.send({
                data : data,
                message : "success",
                status : 1
            })
        } catch (error) {
            res.send({
                message: error.message,
                status : 0
            })
        }
    })

    res.send({
        message : "All the notes",
        status : 1
    })

})


//Route for creating the notes
noteRouter.post('/create', async(req,res) =>{
    try {
        let note = new noteModel(req.body);
        await note.save();
        res.send({
            message : "Note Created successfully",
            status : 1
        })
    } catch (error) {
        res.send({
            message : "error.message",
            status : 0
        })
    }

})

export {noteRouter}