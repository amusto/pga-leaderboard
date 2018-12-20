const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const Player = mongoose.model('players');

module.exports = (app) => {
    //GET PLAYERS
    app.get('/api/players', requireLogin, async (req, res) => {
        const players = await Player.find().sort({score: 'desc', last_name: 'desc'}).select();

        res.send(players);
    });

    //GET PLAYER BY ID
    app.get('/api/players/:playerId', (req, res) => {
        //console.log(req)
        //TODO: fix this up to return a specific player
        res.send('Should return a player');
    });

    //DELETE PLAYER BY ID
    app.delete('/api/players/:playerId', (req, res) => {
        Player.findByIdAndRemove(req.params.playerId, (err, player) => {
            if (err) return res.status(500).send(err);

            const response = {
                message: "Player successfully deleted",
                id: player._id
            };
            return res.status(200).send(response);
        });
    });

    // app.post('/api/players/webhooks', (req, res) => {
    //     const p = new Path('/api/players/:surveyId/:choice');
    //
    //     _.chain(req.body)
    //         .map(({ email, url }) => {
    //             const match = p.test(new URL(url).pathname);
    //             if (match) {
    //                 return {
    //                     email,
    //                     surveyId: match.surveyId,
    //                     choice: match.choice
    //                 };
    //             }
    //         })
    //         .compact()
    //         .uniqBy('email', 'surveyId')
    //         .each(({ surveyId, email, choice }) => {
    //             console.log(surveyId);
    //             console.log(choice);
    //             Survey.updateOne({
    //                 _id: surveyId,
    //                 recipients: {
    //                     $elemMatch: { email: email, responded: false}
    //                 }
    //             }, {
    //                 $inc: { [choice]: 1 },
    //                 $set: { 'recipients.$.responded': true },
    //                 lastResponded: new Date()
    //             }).exec();
    //         })
    //         .value();
    //
    //     res.send({});
    // });

    //POST TO ADD A PLAYER
    app.post('/api/players', requireLogin, async (req, res) => {
        const { first_name, last_name, score } = req.body;

        const player = new Player({
           first_name,
           last_name,
           score
        });

        try {
            await player.save();
            //const user = await req.user.save();

            res.send(player);
        } catch (err) {
            res.status(422).send(err);
        }
    });

};