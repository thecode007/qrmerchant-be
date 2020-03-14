// since we are in developement mode
require('dotenv').config()
const express = require('express')
const app = express()
const session = require('express-session')
const passport = require('passport')
const port = 3000
const bcrypt = require('bcrypt')
const inializePassport = require('./passport-config')
const response = require('./model/Response')
const validators = require('./validators')

inializePassport(passport, 
    email =>{}, 
    id=>{})
    
app.use(passport.initialize());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUnitialized: false
}));

app.use(passport.session())
app.use(express.urlencoded({extended:false}))


app.get('/', (req, res) => res.send('Hello World!'))

app.post('/register',notAuthenticated, (req, res)=>{
    // In case not all fields filled
    if(req.body.username == null || req.body.username.length == 0 || req.body.email == null || req.body.email.length == 0
         || !req.body.password.trim() || req.body.password.length == 0) {
        return res.status(400).json(new response(400, null, "All fields are required").JSON)
    }
    if(!validators(req.body.email)){
        return res.status(400).json(new response(400, null, "Please enter an a valid email").JSON)
    }
         bcrypt.hash(req.body.password, 10, (err, hash) => { 
             if(err){
                 console.log(err)
                 return res.status(500).json(new response(500, null, "Internal server error").JSON)
             }
           // saving user goes here
           return res.status(201).json(new response(201, null, "Registered Successfully").JSON)
         })
});

app.post('/login',notAuthenticated,(req, res) => {
    passport.authenticate('login', async (err, user, info) => {    
         try {
         console.log(err)
        if(err || !user){
          const error = new Error('An Error occurred')
          return res.json(error);
        }
        req.login(user, { session : false }, async (error) => {
          if( error ) {return error}
          //We don't want to store the sensitive information such as the
          //user password in the token so we pick only the email and id
          const body = { _id : user._id, email : user.email };
          //Send back the token to the user
          return res.json({ token });
        });    
     } catch (error) {
        return res.json(error);
    }
    });
});





// To be used as a middleware to ensure an api accessed in case authenticated
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()){
        return next()
    }
    return res.status(401).json(new response(401, null, 
        "Un authenticated user").JSON)
}

// To be used as a middleware to ensure an api accessed in case not authenticated
function notAuthenticated(req, res, next) {
    if (req.isAuthenticated()){
        return res.status(403).json(new response(403, null, 
            "Can't access this request when you are authenticated").JSON)
    }
    next();
}
app.listen(port, () => console.log(`Example app listening on port ${port}!`))