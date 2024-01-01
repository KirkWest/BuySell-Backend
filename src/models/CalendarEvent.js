const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CalendarEventSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  childNames: {
    type: [String],
    default: [],
  },
  eventType: {
    type: String,
    enum: ["buy", "sell"],
    default: "sell",
  },
});

const CalendarEvent = mongoose.model('CalendarEvent', CalendarEventSchema);

module.exports = { CalendarEvent };