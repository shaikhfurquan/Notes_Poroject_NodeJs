import express  from "express"
import dotenv from "dotenv"
import cors from "cors"
import {connection} from "./db.js"
import { userRouter } from "./routes/userRoutes.js"
import { noteRouter } from "./routes/noteRoutes.js"
const app = express()
dotenv.config()

const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/user' , userRouter)
app.use('/note' , noteRouter)

app.get('/', (req, res) =>{
    res.send({message : 'Api is working'})
})




app.listen(port , async() =>{
    try {
        await connection
        console.log(`Database Connection Established.`);
    } catch (err) {
        console.log(err);
    }
    console.log(`listening on http://localhost:${port}`);
})