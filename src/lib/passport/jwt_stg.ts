//import passport from 'passport';
import {Strategy as JwtStrategy, ExtractJwt, StrategyOptions} from 'passport-jwt'
import { UserModel } from '../../models/user';
import dotenv from 'dotenv'
import { extract_from_cookies } from '../../../utils/extractjwt_from_cookies';
dotenv.config()
const opts: StrategyOptions = {
    jwtFromRequest: extract_from_cookies,
    secretOrKey: process.env.JWT_SECRET,
}
export const jwt_strategy = new JwtStrategy(opts, async function(jwt_payload, done) {
    try {
        const user = await UserModel.findOne({id: jwt_payload.sub})
        if (!user) return done(null, false);
        return done(null, user);
    } catch(err) {
        if (err instanceof Error) {
            return done(err, false);
        }
    }
})