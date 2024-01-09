const { CalendarEvent } = require('../models/CalendarEvent');

// manages child names in database
exports.manageChildNames = async (req, res) => {
  const {date, action, childName} = req.body;

  try {
    let event = await CalendarEvent.findOne({date});

    if (action == "add") {
      if (!event) {
        event = new CalendarEvent({ date, childNames: [childName] });
      } else {
        event.childNames.push(childName);
      }
    } else if (action === "remove") {
      event.childNames = event.childNames.filter(name => name !== childName);
      if (event.childNames.length == 0) {
        await CalendarEvent.deleteOne({ _id: event._id });
        return res.json({
          message: "Successfully removed child"
        });
      }
    }

    await event.save();
    res.json({
      message: "Day updated successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
}

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