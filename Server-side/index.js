const express = require("express");
const app = express();
const mongoose = require("mongoose");
const CrimeModel = require('./models/crimes');

const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://user1:uh5iv4-*BUxF$rN@cluster0.m0nko.mongodb.net/CrimeApp?retryWrites=true&w=majority");

app.get("/Map", (req, res) => {
    CrimeModel.find({}, (err, result) => {
        if(err){
            res.json(err);
        }
        else{
            res.json(result);
        }
    })
    CrimeModel.fin
})

app.post("/create", async (req, res) => {
    const crime = req.body;
    const newCrime = new CrimeModel(crime);
    await newCrime.save();

    res.json(crime);
})

app.listen(3001, () => {
    console.log("Server runs");
})