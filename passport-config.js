const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function init(passport, getUserEmail, getUserByID) {
    passport.use('login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password'
      }, async (email, password, done) => {
        try {
          //Find the user associated with the email provided by the user
          const user = null
        //   await UserModel.findOne({ email });
          if( !user ){
            //If the user isn't found in the database, return a message
            return done(null, false, { message : 'User not found'});
          }
         
        //   await user.isValidPassword(password);
        bcrypt.compare(password, user.password,(err,same) =>{
            if(same) {
                return done(null, user, { message : 'Logged in Successfully'});
            }
        });
          //Send the user information to the next middleware
        } catch (error) {
          return done(error);
        }
      }));     
}

module.exports = init