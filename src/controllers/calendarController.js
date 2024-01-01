const { CalendarEvent } = require('../models/CalendarEvent');
const { authenticateToken } = require('../middleware/authMiddleware');

// Toggles event type (buy/sell)
exports.toggleEventType = async (req, res) => {
  const { date } = req.body;

  try {
    const event = await CalendarEvent.findOne({date});

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    // toggle buy sell button
    event.eventType = event.eventType === "buy" ? "sell" : "buy";
    await event.save();

    res.json({
      message: "toggle successful"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
};

// manages child names in database
exports.manageChildNames = async (req, res) => {
  const {date, action, childName} = req.body;

  try {
    const event = await CalendarEvent.findOne({date});

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    //checks authentication
    const handleEvent = async () => {
      if (action === "add") {
        // Add child's name to array
        event.childNames.push(childName);
      } else if (action === "remove") {
        // Removes a child from the array
        event.childNames = event.childNames.filter((name) => name !== childName);
      }

      //If there are no children it will switch back to "sell"
      if (event.childNames.length === 0) {
        event.eventType = "sell";
      }

      await event.save();

      res.json({
        message: "Childs name saved successfully"
      });
    };

    authenticateToken(req, res, handleEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
};