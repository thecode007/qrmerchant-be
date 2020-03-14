const LocalStrategy = require('passport-local').Strategy

function init(passport) {
    const authenticateUser = (email, password, done) => {
        const user = []; // getting a user
        if(user == null) {
            return done(null, false, {message: "No user with that email"})
        }
    }
    passport.use(new LocalStrategy({ usernameField: 'email'}, authenticateUser))
    passport.serializeUser((user, done)=> {})
}

module.exports = init