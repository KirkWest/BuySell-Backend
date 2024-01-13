const { CalendarEvent } = require('../models/CalendarEvent');

// manages child names in database
exports.manageChildNames = async (req, res) => {
  const {date, action, childName} = req.body;

  try {
    let event = await CalendarEvent.findOne({ date });

    if (action == "add") {
      if (!event) {
        event = new CalendarEvent({ date, childNames: [childName] });
      } else {
        // this prevents duplicate names (shouldn't really be an issue but best practice to have)
        if (!event.childNames.includes(childName)) {
          event.childNames.push(childName);
        }
      }
    } else if (action === "remove") {
      if (event) {
        event.childNames = event.childNames.filter(name => name !== childName);
        if (event.childNames.length === 0) {
          await CalendarEvent.deleteOne({ _id: event._id });
        } else {
          await event.save();
        }
        return res.json({
          message: "Successfully removed child"
        });
      } else {
        return res.status(404).json({
          message: "Event not found"
        });
      }
    }

    if (event) {
      await event.save();
      res.json({
       message: "Day updated successfully"
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
};

// this will fetch from the database only when a buy button is active
exports.getEvents = async (req, res) => {
  try {
    const events = await CalendarEvent.find({});
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
};