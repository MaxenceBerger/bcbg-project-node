const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    fileType: {
        type: String,
        required: true
    },
    fileSize: {
        type: String,
        required: true
    }
}, {
    timestamps: true
}, {
    versionKey: false
});

const Image = mongoose.model('Image', ImageSchema)

module.exports = Image