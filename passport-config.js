const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function init(passport, getUserEmail, getUserByID) {
    const authenticateUser = (email, password, done) => {
        if(email == null || email.length == 0 || password == null || password.length == 0) {
            return done(null, false, {message: "All fields are required"})
        }
        const user = getUserEmail(email); // getting a user
        if(user == null) {
            return done(null, false, {message: "Wrong username or password"})
        }
            bcrypt.compare(password, user.password,(err,same) =>{
                if(same) {
                    return done(null, false, {message: "Wrong username or password"})
                }
                return done(null, true, {message: "Logged In!!"})
            })
        }
    passport.use(new LocalStrategy({ usernameField: 'email'}, authenticateUser))
    passport.serializeUser((user, done)=> {
        done(null, user.id)
    })

    passport.deserializeUser((id, done)=> {
        done(null,getUserByID(id))
    })
}

module.exports = init