
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {userModel} from "../models/userModel.js"
const userRouter = express.Router();


//Route for all users
userRouter.get('/', (req, res) => {
    res.send('All users found')

})

//Route for user registration
userRouter.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, 5, async (err, hash) => {
        if (err) return res.send({ message: "Password Hasing Error", status: 0 })
        try {
            let user = new userModel({ name, email, password: hash });
            await user.save()
            res.send({ 
                message: "User Created", 
                status: 0 
            })
        } catch (error) {
            console.log(err);
            res.send({ 
                message: error.message, 
                status: 0 
            })
        }
    })
})


//Creating the login routes
userRouter.post('/login', async(req,res) =>{
    const {email, password} = req.body;

    //Defining the time of the token(valid time)
    let option = {
        expiresIn : "3m"
    }

    //verify the user available or not.
    try {
        let data = await userModel.find({email})
        if(data.length > 0) {
            let token = jwt.sign({userId:data[0]._id}, "shaikh" , option)   //payload, shaikh-->secretkey
            bcrypt.compare(password , data[0].password , (err , result) =>{
                if(err) return res.send({message:"Something went wrong" + err , status:0})
                if(result){
                    res.send({
                        message : 'User logged in successfully',
                        token : token,
                        status : 1
                    })
                }else{
                    res.send({
                        message : 'Invalid Password',
                        status : 0
                    })
                }
            })
        }else{
            //USer not found then
            res.send({
                message : 'User not found',
                status : 0
            })
        }
    } catch (error) {
        res.send({
            message : error.message,
            status : 0 
        })  
    }

    //comparting the password


})

export { userRouter }