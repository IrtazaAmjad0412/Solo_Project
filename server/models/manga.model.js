const mongoose = require('mongoose');

const MangaSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "*Title is required!*"],
        minlength: [4, "Title must be 4 characters or longer"]
    },
    description: {
        type: String,
        required: [true, "*Description is required!*"],
        minlength: [6, "Description must be 6 characters or longer"]
    },
    latestChapterRead: {
        type: Number,
        required: [true, "*Latest Chapter Read is required!*"]
    },
    comment: {
        type: String,
        required: [true, "*Comment is required!*"],
        minlength: [6, "Comment must be 6 characters or longer"]
    }
}, 
{ timestamps: true }
);

module.exports = mongoose.model('Manga', MangaSchema);