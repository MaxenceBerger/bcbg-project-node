const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    eventName:{ type: String, required: true },
    points:{ type: Number, required: true },
    picture:{ type: String, required: false, default: null },
    team:{ type: String, ref: 'teamName', required: false, default: null },
    status:{ type: String, required: false, default: null },
}, {
    versionKey: false
});

const Event = mongoose.model('Event', EventSchema)

module.exports = Event