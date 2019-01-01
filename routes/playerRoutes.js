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
    app.get('/api/player/:playerId', requireLogin, async (req, res) => {
        const player = await Player.findById(req.params.playerId);

        res.send(player);
    });

    //DELETE PLAYER BY ID
    app.delete('/api/players/:playerId', requireLogin, (req, res) => {
        Player.findByIdAndRemove(req.params.playerId, (err, player) => {
            if (err) return res.status(500).send(err);

            const response = {
                message: "Player successfully deleted",
                id: player._id
            };
            return res.status(200).send(response);
        });
    });

    //POST TO ADD A PLAYER
    app.post('/api/players', requireLogin, async (req, res) => {
        const { first_name, last_name, score } = req.body;

        const playerExists = await Player.find({first_name, last_name}).select();

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
            res.send(statusMessage);
        }
    });

    //PUT TO UPDATE A PLAYER
    app.put('/api/players', requireLogin, async (req, res) => {
        const { first_name, last_name, score } = req.body;

        let updatePlayer = Player.findByIdAndUpdate(
            req.body._id,
            req.body,
            //{ "first_name": first_name, "last_name": last_name, "score": score }
            {new: true},
            (err, player) => {
                if (err) return res.status(500).send(err);
                return res.send(player);
            }
        );
    });

};