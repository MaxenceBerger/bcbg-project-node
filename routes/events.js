const express = require('express')
const router = express.Router()
const {upload} = require('../helper/fileHelper.js')


const  { 
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
    singleFileUplaod,
} = require('../controllers/events.js')

router.get('/', getEvents)

router.get('/unrealized', getEventsPublicForm)

router.get('/status', getEventsWithStatus)

router.get('/waiting-status', getEventsWaitingStatus)

router.get('/blue-team', getEventsByBlueTeam)

router.get('/red-team', getEventsByRedTeam)

router.get('/yellow-team', getEventsByYellowTeam)

router.get('/:eventID', getEvent)

router.post('/', createEvent) 

router.put('/:eventID', updateEvent) 

router.delete('/:eventID', deleteEvent)

router.get('/photo/:photoID', getPhotos)

router.post('/upload', upload.single('upload'), singleFileUplaod)

module.exports = router