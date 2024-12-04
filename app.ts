/*
Author: Kalle Liljeström
Sources: Course source codes
*/
import express from 'express';
import router from "./src/index"
import mongoose, { Connection} from 'mongoose'

const app = express()
const port = 3000

const mongoDB: string = "mongodb://127.0.0.1:27017/testdb"
mongoose.connect(mongoDB)
mongoose.Promise = Promise
const db: Connection = mongoose.connection

db.on("error", console.error.bind(console, "MongoDB connection error"))


app.use(express.static('public'))
app.use("/", router)


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

