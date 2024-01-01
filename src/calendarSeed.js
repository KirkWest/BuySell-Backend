require('dotenv').config();
const { CalendarEvent } = require('./models/CalendarEvent');
const { databaseConnect } = require('./database');

const seedData = [
  {
    date: new Date('2024-01-01'),
    childNames: ['Child1', 'Child2'],
    eventType: 'sell',
  },
  // Add more CalendarEvent objects as needed
];

// Wait for the database connection before proceeding
databaseConnect()
  .then(() => {
    // Insert the seed data into the CalendarEvent collection
    return CalendarEvent.insertMany(seedData);
  })
  .then((events) => {
    console.log("Calendar events seeded successfully:", events);
  })
  .catch((error) => {
    console.error("Error seeding calendar events:", error);
  });
