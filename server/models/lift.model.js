const mongoose = require('mongoose')
require('./connection');

const liftSchema = new mongoose.Schema({
    passenger_count: String,
    from_floor: String,
    to_floor: String,
    date_time: String,
});

const Lift = mongoose.model('lifts', liftSchema);

module.exports = Lift