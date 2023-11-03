import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

//For checking user have valid token/credentials
function authenticator(req, res, next) {
    const token = req.headers.authorization
    jwt.verify(token, "shaikh", (err, decode) => {
        if(err){
            res.send({
                message: "Token is not valid please login",
                status: 2
            })
        }
        if (decode) {
            req.body.user = decode.userId
            next()
        } else {
            res.send({
                message: "Token is not valid please login",
                status: 2
            })
        }
    })
}


export{authenticator} 