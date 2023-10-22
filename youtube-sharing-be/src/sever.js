import express from "express"

const app = express()
const PORT = 8080
const HOSTNAME = "localhost"

app.get("/", (req,res) => {
    res.send("Hello world!")
})

app.listen(PORT, HOSTNAME, () => {
    console.log("run sever")
})