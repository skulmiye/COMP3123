var express = require("express")

const SERVER_PORT = 8089
var app = express()

/* GET request: /hello return "Hello Express JS"
   http://localhost:8089/hello */
app.get("/hello", (req, res) => {
    res.send("<h1>Hello Express JS</h1>")
})


/* GET request: /user return  { "firstname":"Pritesh", "lastname": "Patel" }. 
   Use Querystring to send values
   http://localhost:8089/user */
app.get("/user", (req, res) => {
    if(req.query.firstname == undefined | req.query.lastname == undefined){
        res.send("Please send firstname and lastname as a query parameter")
    }
    else{
        res.json(req.query)
    }
})
/* POST request: /user return  { "firstname":"Pritesh", "lastname": "Patel" }. 
   Use path parameter to send values*/
//http://localhost:8089/user
app.post("/user/:firstname/:lastname", (req, res) => {
    const {firstname, lastname} = req.params
    res.send(`Welcome ${firstname} ${lastname}`)
})

app.listen(SERVER_PORT, () => {
    console.log(`Server running at http://localhost:${SERVER_PORT}`);
})