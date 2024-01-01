const CalendarEvent = require('../models/CalendarEvent');
const { authenticateToken } = require('../middleware/authMiddleware');

// Adds a new buy button to calendar
exports.addEvent = async (req, res) => {
  const {date} = req.body;

  try {
    const calendarEvent = await CalendarEvent.findOne({date});
    if(!calendarEvent) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    // Checks authentication
    authenticateToken(req, res, async () => {
      calendarEvent.hasBuyButton = true;

      await calendarEvent.save();

      res.json({
        message: "Event added successfully"
      });
    });
  } catch (error) {
    console.error(error);
    res.staus(500).json({
      message: "Internal Server Error"
    });
  }
};

// Deletes a buy button
exports.addEvent = async (req, res) => {
  const {date} = req.body;

  try {
    const calendarEvent = await CalendarEvent.findOne({date});
    if(!calendarEvent) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    // Checks authentication
    authenticateToken(req, res, async () => {
      calendarEvent.hasBuyButton = false;

      await calendarEvent.save();

      res.json({
        message: "Event deleted successfully"
      });
    });
  } catch (error) {
    console.error(error);
    res.staus(500).json({
      message: "Internal Server Error"
    });
  }
};