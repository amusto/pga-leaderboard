const passport = require('passport');
//const GoogleStrategy = require('passport-google-oauth20').Strategy;
const TrelloStrategy = require('passport-trello').Strategy
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('users');

//TODO: Move out later
const api_key = '9ac3897e22d09755a5071f8185af3f7b';
const api_token = 'e950bff711fd801e0ac6e0a520f35abdcfae2e1971f2cb1da318dd4c22741502';
const trello_api_url = "https://api.trello.com/1/";
const board_id = "5806a59cddca2d4569824cda"; //Tigris board


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    })
});

passport.use(new TrelloStrategy({
        consumerKey: api_key,
        consumerSecret: api_token,
        callbackURL: '/auth/trello/callback',
        passReqToCallBack: true,
        trelloParams:
            {
                scope: "read,write",
                name: "myApp",
                expiration: "never"

            }
    },
    async (req, token, tokenSecret, profile, done) => {
        //console.log(req)
        //const existingUser = await User.findOne({ googleId: profile.id });
        //console.log(existingUser)

        // if (existingUser) {
        //     return done(null, existingUser);
        // }

        //const user = await new User({ googleId: profile.id }).save();
        //done(null, user);
    })
);

// passport.use(new TrelloStrategy({
//         clientID: keys.googleClientID,
//         clientSecret: keys.googleClientSecret,
//         callbackURL: '/auth/google/callback',
//         proxy: true
//     },
//     async (accessToken, refreshToken, profile, done) => {
//         const existingUser = await User.findOne({ googleId: profile.id });
//         console.log(existingUser)
//
//         if (existingUser) {
//             return done(null, existingUser);
//         }
//
//         const user = await new User({ googleId: profile.id }).save();
//         done(null, user);
//     })
// );