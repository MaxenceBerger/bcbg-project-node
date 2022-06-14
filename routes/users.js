const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1y'});
}

router.post('/login', (req, res) => {
    // TODO: checker en BDD le user par rapport à l'email
    if (req.body.username !== process.env.DEFAULT_USERNAME) {
        res.status(401).send('invalid credentials');
        return ;
    }
    if (req.body.password !== process.env.DEFAULT_PASSWORD) {
        res.status(401).send('invalid credentials');
        return ;
    }

    const user = {
        username: process.env.DEFAULT_USERNAME,
        password: process.env.DEFAULT_PASSWORD,
    };

    const accessToken = generateAccessToken(user);
    res.send({
        accessToken,
    });
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(401);
        }
        req.user = user;
        next();
    });
}

router.get('/is-authorized', authenticateToken, (req, res) => {
    res.send('authorized');
});

module.exports = router