const mongoose = require('mongoose');
const { CalendarEvent } = require('../src/models/CalendarEvent');

jest.mock('mongoose');

describe('CalendarEvent Model', () => {
  describe('should require a date', async () => {
    const eventWithoutDate = new CalendarEvent({ childNames: ['Tia', 'Sam'] });

    await expect(eventWithoutDate.save()).rejects.toThrow();
  });

  describe('should default childNames to an empty array', () => {
    const event = new CalendarEvent({ date: new Date() });

    expect(event.childNames).toEqual([]);
  });

  describe('should accept an array of strings for childNames', async () => {
    const event = new CalendarEvent({ date: new Date(), childNames: ['Alice', 'Bob'] });

    mongoose.save.mockResolvedValue(true);

    await expect(event.save()).resolves.not.toThrow();
  });
});
