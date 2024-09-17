const express = require("express")
const app = express()
const cors = require("cors")
const dotenv = require("dotenv")
const dbConnection = require("./Db_Connection/dbConnection")
const authRoute = require("./Routes/userRoutes")
dotenv.config()

const port = process.env.PORT || 5000;

app.use(express.json())
app.use(cors({
    origin : "https://geeksynergy-task-frontend.vercel.app"
}))

dbConnection()


app.use("/auth",authRoute)


app.get("/",(req,res)=>{ 
    res.send("Welcome to My App")
})

app.listen(port,()=>{
    console.log(`The server un on port ${port}`)
})