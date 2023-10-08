const express = require('express');
const app = express();
const router = express.Router();

//http://localhost:8081/home
router.get('/home', (req,res) => {
  res.sendFile(__dirname + "/home.html")
});

//http://localhost:8081/profile
router.get('/profile', (req,res) => {
  res.sendFile(__dirname + "/user.json")
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
//http://localhost:8081/login?username=bret&password=bret@123
router.get('/login', (req,res) => {
  const { username, password } = req.query;
  // Read data from user.json file
  const user = require('./user.json');

  // If username and password are valid
  if (user.username === username && user.password === password) {
    res.json({
      status: true,
      message: 'User Is valid'
    });
  }
  // If username is invalid
  else if (user.username !== username) {
    res.json({
      status: false,
      message: 'User Name is invalid'
    });
  }
  // If password is invalid
  else if (user.password !== password) {
    res.json({
      status: false,
      message: 'Password is invalid'
    });
  }
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
////http://localhost:8081/logout?username=bret
router.get('/logout', (req,res) => {
  const { username, password } = req.query;
  const user = require('./user.json');
  
  if (user.username === username) {
    res.send(`<h1><b>${username} successfully logout.<b></h1>`)
  }
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port '+ (process.env.port || 8081));