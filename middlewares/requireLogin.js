module.exports = (req, res, next) => {
    console.log('requireLogin', req)
    if (!req.user) {
        res.status(401).send({ error: 'You must log in!' });
    }

    next();
};