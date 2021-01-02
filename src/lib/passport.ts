import { Strategy  } from 'passport-facebook'
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local'
import UserSchema from '../models/user'

/* const clientSecret = process.env.FACEBOOK_APP_SECRET as string
const clientID = process.env.FACEBOOK_APP_ID as string */

const FacebookStrategy = new Strategy({
    clientID: "1533079716891507",
    clientSecret: "5a4e10b862fcddd99a11b5c7950cf773",
    callbackURL: `/api/v1/facebook/callback`,
    passReqToCallback: true,
    profileFields: ['id', 'email', 'picture', 'displayName']
}, async (req, accesstoken, refreshToken, { id, displayName, _json } , done) => {
    const user = await UserSchema.findOne({ facebookId: id })
    if(user) {
        done(null, user)
    } else {
        try {
            const newUser = new UserSchema({ 
                    username: displayName, 
                    userImg: _json.picture.data.url, 
                    access_token: accesstoken,
                    facebookId: id
                  })
            await newUser.save()
            done(null, newUser)
        } catch (error) {
            done(error)
        }
    }
})

passport.use(new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'username'
    },
    async (username, password, done) => {
            try {
                console.log(username, password);
                
                const user = await UserSchema.findOne({ username });

                if(!user) return done(null, false);

                return done(null, user)
                
            } catch (error) {
                return done(error)
            }
    }
))

export default  FacebookStrategy
