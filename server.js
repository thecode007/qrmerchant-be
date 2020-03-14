const express = require('express')
const app = express()
const passport = require('passport')
const port = 3000
const bcrypt = require('bcrypt')
const inializePassport = require('./passport-config')
const response = require('./model/Response')
const validators = require('./validators')
inializePassport(passport)
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({extended:false}))


app.get('/', (req, res) => res.send('Hello World!'))

app.post('/register', (req, res)=>{
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
app.listen(port, () => console.log(`Example app listening on port ${port}!`))