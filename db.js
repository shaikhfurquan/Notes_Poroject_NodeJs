
import mongoose from 'mongoose'
import dotenv  from 'dotenv'

dotenv.config()
const db_connect = process.env.DB_CONNECT
const connection = mongoose.connect(db_connect)


export {connection}
