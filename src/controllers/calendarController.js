const CalendarEvent = require('../models/CalendarEvent');

//controller to handle admin interactions with calendar
exports.addRemoveBuyButton = async (req, res) => {
  // grabs the date and action from body
  const {date, action} = req.body;

  try {
    const calendarEvent = await CalendarEvent.findOne({date});
    if (!calendarEvent) {
      return res.status(404).json({
        message: 'Event not found'
      });
    }

    if (action === 'addBuyButton') {
      calendarEvent.hashBuyButton = true;
    } else if (action === 'removeBuyButton') {
      calendarEvent.hasBuyButton = false;
    }

    await calendarEvent.save();

    res.json({
      message: 'save succesfull'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};