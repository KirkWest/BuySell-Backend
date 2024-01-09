const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CalendarEventSchema = new Schema({
  date: {
    type: Date,
    required: true,
    unique: true,
  },
  childNames: {
    type: [String],
    default: [],
  },
});

const CalendarEvent = mongoose.model('CalendarEvent', CalendarEventSchema);

module.exports = { CalendarEvent };