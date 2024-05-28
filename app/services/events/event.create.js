const db = require('../../models');

async function create(payload, req, files) {
  let createdEvent = await db.Event.create(payload);
  await this.image.upload(req, 'Event', createdEvent.id, files);
  return createdEvent;
}

module.exports = { create };
