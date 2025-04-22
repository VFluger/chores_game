const express = require('express');
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.urlencoded({extended: false}))

// Logging to console
// Optional TODO: log to file
app.use((req, res, next) =>{
    console.log(`${req.method} from ${req.ip} to ${req.url}`)
    next()
})

// Root Page
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/frontend/form.html")
})


// POST new user to db
app.post('/register', (req, res) => {
    console.log(req.body.name + req.ip)
})

// Listening on 8080
const server = app.listen(8080, () => {
    const port = server.address().port
    console.log(`Server listening on ${port}`)
})