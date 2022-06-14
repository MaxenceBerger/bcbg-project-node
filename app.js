const express = require('express')
const mongoose = require('mongoose')
const app = express()
const teams_routes = require('./routes/teams.js')
const events_routes = require('./routes/events.js')
const users_routes = require('./routes/users.js')
const path = require('path')

require('dotenv').config()

mongoose.connect(process.env.MONGO_URI)
    .then((result) => app.listen(5000))
    .catch((err) => console.log(Error))

app.use(express.json())

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', '*');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/api/teams', teams_routes)
app.use('/api/events', events_routes)
app.use('/api/users', users_routes)
