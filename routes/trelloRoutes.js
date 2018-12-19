const keys = require('../config/keys');
const request = require("request");

//TODO: Move these out
//Trello api key and token for DSS boards
const api_key = '9ac3897e22d09755a5071f8185af3f7b';
const api_token = 'e950bff711fd801e0ac6e0a520f35abdcfae2e1971f2cb1da318dd4c22741502';
const trello_api_url = "https://api.trello.com/1/";
const board_id = "5806a59cddca2d4569824cda"; //Tigris board

module.exports = (app) => {
    app.post('/api/trelloCallback', async (req, res) => {
        var runUpdateCount = 0;
        //TODO: Add logic to check for passed param
        targetListName = req.body.targetListName ? req.body.targetListName : targetListName;

        var options = { method: 'GET',
            url: `https://api.trello.com/1/boards/${board_id}`,
            qs:
                { lists: 'open',
                    key: api_key,
                    token: api_token
                }
        };

        const boards = await request(options, function (error, response, body) {
            if (error) throw new Error(error);

            var data = JSON.parse(body);

            //GetListByName
            var list = getListByName(data.lists, targetListName); //TODO: Pass name to search and determine boardName and Id
            if (!list) {
                res.send('Required: Valid targetListName');
            } else {
                if (runUpdateCount === 0) {
                    //Work on monitored list
                    var options = { method: 'GET',
                        url: `https://api.trello.com/1/lists/${list.id}`, //Tigris
                        qs:
                            {
                                cards: 'open',
                                key: api_key,
                                token: api_token
                            }
                    };

                    let results = request(options, function (error, response, body) {
                        if (error) throw new Error(error);

                        var reportingCardDescription = ``;

                        var data = JSON.parse(body);
                        //No longer need this
                        //var getCard = getCardByName(data.cards, reportingCardName); TODO: Update later to check reporting list for a Sprint XX report card

                        reportingCardDescription = getReportingDescription(data.cards, list);

                        //Update report card
                        //TODO: Have this check and use a reporting card for the selected Sprint
                        var getCard = {}
                        getCard.id = "5ba14975b26ea1729cda1e0d"; //NOTE: Hardcoded card ID

                        //Update cards description
                        var updatedDate = new Date();
                        var updatedDesc = `${reportingCardDescription}\n\nUpdated: ${updatedDate}`;
                        var options = { method: 'PUT',
                            url: `https://api.trello.com/1/cards/${getCard.id}`,
                            qs:
                                {
                                    desc: updatedDesc,
                                    key: api_key,
                                    token: api_token
                                }
                        };

                        request(options, function (error, response, body) {
                            if (error) throw new Error(error);

                            runUpdateCount = runUpdateCount + 1;
                            res.set({'Content-Type': 'application/json; charset=utf-8'}).status(200).send(body);
                            //res.status(200).json(body);
                        });

                    });
                }
            }

        });


        //res.send(user);
    });

    //Trello helpers
    function getReportingDescription(aCards, list) {
        var result = '';
        results = `**Completed Stories for ${list.name}:**\n`;

        var StoryListMarkup = ``;
        aCards.forEach(function(card) {
            StoryListMarkup += `- ${card.name}\n`;
        });

        results += StoryListMarkup;
        return results;
    }

    function getListByName(listsArray, nameToSearch) {
        var result = '';
        if (!nameToSearch) {
            console.log('Please supply a name to search.')
            return result;
        }
        listsArray.forEach(function(list) {
            if(list.name.substring(0, nameToSearch.length) === nameToSearch) {
                result = list;
                return result;
            }
        });
        return result;
    }

    function getCardByName(listsArray, nameToSearch) {
        var result = '';
        if (!nameToSearch) {
            console.log('Please supply a name to search.')
            return result;
        }
        listsArray.forEach(function(list) {
            if(list.name.substring(0, nameToSearch.length) === nameToSearch) {
                result = list;
                return result;
            }
        });
        return result;
    }


};