const CalendarEvent = require('../models/CalendarEvent');
const { authenticateToken } = require('../middleware/authMiddleware');

// controller to handle admin interactions with calendar
exports.addRemoveBuyButton = async (req, res,) => {
  // Grabs the date and action the body
  const {date, action} = req.body;

  try {
    const calendarEvent = await CalendarEvent.findOne({date});
    if (!calendarEvent) {
      return res.status(404).json({
        message: 'Event not found'
      });
    }

    // Check authentication using the middleware
    authenticateToken(req, res, async () => {
      const authenticatedUser = req.user;
      console.log('Authenticated User:', authenticatedUser);

      if (action === 'addBuyButton') {
        calendarEvent.hashBuyButton = true;
      } else if (action === 'removeBuyButton') {
        calendarEvent.hasBuyButton = false;
      }

      await calendarEvent.save();

      res.json({
        message: "Save successful"
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
};
