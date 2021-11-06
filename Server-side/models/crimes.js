const mongoose = require("mongoose");

const crimeSchema = new mongoose.Schema({
    Location: {
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
    }
});

const CrimeModel = mongoose.model("crimes", crimeSchema);

module.exports = CrimeModel;