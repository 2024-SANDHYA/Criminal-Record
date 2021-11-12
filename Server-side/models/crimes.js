const mongoose = require("mongoose");

const crimeSchema = new mongoose.Schema({
    Latitude: {
        type: Number,
        required: true,
    },
    Longitude: {
        type: Number,
    },
    Locality: {
        type: String,
        required: true,
    },
    ReportedBy: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    CrimeBeingReported: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
});

const CrimeModel = mongoose.model("crimes", crimeSchema);

module.exports = CrimeModel;