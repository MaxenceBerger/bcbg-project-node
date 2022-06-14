const User = require('../models/User.js')

const getUsers = ((req, res) => {
    User.findOne({username: req.params.username})
    .then(result => res.status(200).json({ result }))
    .catch(error => res.status(500).json({msg: error}))
})
module.exports = {
    getUsers,
}
