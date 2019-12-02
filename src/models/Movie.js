const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    original_language: {
        type: String
    },
    original_title: {
        type: String
    },
    overview: {
        type: String
    },
    popularity: {
        type: Number
    },
    release_date: {
        type: Date
    },
    runtime: {
        type: Number
    },
    tagline: {
        type: String
    },
    title: {
        type: String
    },
    vote_average: {
        type: Number
    },
    vote_count: {
        type: Number
    }
});

module.exports = mongoose.model('Movie', movieSchema);
