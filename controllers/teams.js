const Team = require('../models/Team.js')

const getTeams = ((req, res) => {
    Team.find({})
    .then(result => res.status(200).json({ result }))
    .catch(error => res.status(500).json({msg: error}))
})

const getTeam = ((req, res) => {
    Team.findOne({ _id: req.params.teamID })
        .then(result => res.status(200).json({ result }))
        .catch(() => res.status(404).json({msg: 'Team not found'}))
})

const createTeam = ((req, res) => {
    Team.create(req.body)
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(500).json({msg:  error }))
})

const updateTeam = ((req, res) => {
    Team.findOneAndUpdate(
        { _id: req.params.teamID }, req.body, { new: true, runValidators: true })
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(404).json({msg: 'Team not found' }))
})

const deleteTeam = ((req, res) => {
    Team.findOneAndDelete({ _id: req.params.teamID })
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(404).json({msg: 'Team not found' }))
})

module.exports = {
    getTeams,
    getTeam,
    createTeam,
    updateTeam,
    deleteTeam
}