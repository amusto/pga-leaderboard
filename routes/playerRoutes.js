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
    app.get('/api/player/:playerId', async (req, res) => {
        const player = await Player.findById(req.params.playerId);

        res.send(player);
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

        const playerExists = await Player.find({first_name, last_name}).select();
        console.log(playerExists.length)

        if (playerExists.length === 0) {
            const player = new Player({
               first_name,
               last_name,
               score
            });

            try {
                await player.save();
                res.send(player);
            } catch (err) {
                res.status(422).send(err);
            }
        } else {
            let statusMessage = {
                status: 'error',
                message: 'This player exists!'
            }
            console.log(statusMessage)
            res.send(statusMessage);
        }
    });

};