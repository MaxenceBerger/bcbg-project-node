const mongoose = require('mongoose')

const TeamSchema = new mongoose.Schema({
    teamName:{ type: String, required: true },
    totalPoints:{ type: Number, required: true },
    totalEvents:{ type: Number, required: true },
}, {
    versionKey: false
});
const Team = mongoose.model('Team', TeamSchema)

module.exports = Team