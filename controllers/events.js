const Event = require('../models/Event.js')
const Image = require('../models/Image.js')

const enumStatus = ['OK_STATUS', 'KO_STATUS', 'WAITING_STATUS']

const getEvents = ((req, res) => {
    Event.find({})
        .then(result => res.status(200).json({ result }))
        .catch(error => res.status(500).json({msg: error}))
})

const getPhotos = ( async(req, res) => {
    Image.findOne({ _id: req.params.photoID })
        .then(result => res.status(200).json({ result }))
        .catch(() => res.status(404).json({msg: 'Event not found'}))
})

const getEventsPublicForm = ((req, res) => {
    Event.find({team: null, status: null, picture: null})
        .then(result => res.status(200).json({ result }))
        .catch(error => res.status(500).json({msg: error}))
})

const getEventsWithStatus = ((req, res) => {
    Event.find({status: enumStatus})
        .then(result => res.status(200).json({ result }))
        .catch(error => res.status(500).json({msg: error}))
})

const getEventsWaitingStatus = ((req, res) => {
    Event.find({status: "WAITING_STATUS"})
        .then(result => res.status(200).json({ result }))
        .catch(error => res.status(500).json({msg: error}))
})

const getEventsByBlueTeam = ((req, res) => {
    Event.find({team: "BLUE_TEAM", status: "OK_STATUS"})
        .then(result => res.status(200).json({ result }))
        .catch(error => res.status(500).json({msg: error}))
})

const getEventsByRedTeam = ((req, res) => {
    Event.find({team: "RED_TEAM", status: "OK_STATUS"})
        .then(result => res.status(200).json({ result }))
        .catch(error => res.status(500).json({msg: error}))
})

const getEventsByYellowTeam = ((req, res) => {
    Event.find({team: "YELLOW_TEAM", status: "OK_STATUS"})
        .then(result => res.status(200).json({ result }))
        .catch(error => res.status(500).json({msg: error}))
})

const getEvent = ((req, res) => {
    Event.findOne({ _id: req.params.eventID })
        .then(result => res.status(200).json({ result }))
        .catch(() => res.status(404).json({msg: 'Event not found'}))
})

const createEvent = ((req, res) => {
    Event.create(req.body)
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(500).json({msg:  error }))
})

const updateEvent = ((req, res) => {
    Event.findOneAndUpdate(
        { _id: req.params.eventID }, req.body, { new: true, runValidators: true })
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(404).json({msg: 'Event not found' }))
})

const deleteEvent = ((req, res) => {
    Event.findOneAndDelete({ _id: req.params.eventID })
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(404).json({msg: 'Event not found' }))
})

const singleFileUplaod = (async(req, res) => {
    console.log(req.file);
    try {
        const file = new Image({
            fileName: req.file.filename,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2)
        });
        console.log(file);
        await file.save();
        res.status(201).send(file.fileName)
    }catch(error) {
        res.status(400).send(error.message)
    }
})

const fileSizeFormatter = (bytes, decimal) => {
    if(bytes === 0){
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const size = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + '-' + size[index];
}

module.exports = {
    getEvents,
    getEventsPublicForm,
    getEventsWithStatus,
    getEventsWaitingStatus,
    getEventsByBlueTeam,
    getEventsByRedTeam,
    getEventsByYellowTeam,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
    getPhotos,
    singleFileUplaod
}