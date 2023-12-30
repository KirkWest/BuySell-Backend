const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CalendarEventSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  hasBuyButton: {
    type: Boolean,
    default: false,
  },
});

const CalendarEvent = mongoose.model('CalendarEvent', CalendarEventSchema);

module.exports = { CalendarEvent };