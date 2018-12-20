// Common modules are better supported by Node over ES2016 modules
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

const keys = require('./config/keys');

require('./models/User');
require('./models/Player');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express(); // Generates a running express app

app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.enable("trust proxy");

require('./routes/authRoutes')(app);
require('./routes/playerRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    console.log('Running in Production');
    // Express will serve up production assets
    app.use(express.static('client/build'));

    // Express will serve up the index.html file as the default if it can't find it in our route files above
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Running app on port: ${PORT}`));
