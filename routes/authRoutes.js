/*
    File: authRoutes.js
    Description: Client authentication is provided via Passport.js and maintained with cookies
*/
const passport = require('passport');

module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
        //console.log(req)
        res.redirect('/dashboard');
      }
    );

    app.get('/api/logout', (req, res) => {
        req.logout();

        res.redirect('/');
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });

};