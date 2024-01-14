require('dotenv').config();
const { CalendarEvent } = require('./models/CalendarEvent');
const { databaseConnect } = require('./database');

const seedData = [
  {
    date: new Date('2024-01-19'),
    childNames: ['Child1', 'Child2'],
    eventType: 'sell',
  },

];

// Wait for the database connection before proceeding
databaseConnect()
  .then(() => {
    return CalendarEvent.insertMany(seedData);
  })
  .then((events) => {
    console.log("Calendar events seeded successfully:", events);
  })
  .catch((error) => {
    console.error("Error seeding calendar events:", error);
  });
