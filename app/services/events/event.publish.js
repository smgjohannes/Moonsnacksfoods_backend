const db = require('../../models');
const handleDatabaseError = require('../../utils/errorHandlers');

async function publish(id) {
  const event = await db.Event.findByPk(id);

  if (!event) {
    throw new Error('Event not found');
  }

  event.published = !event.published;
  event.status = event.status === 'published' ? 'draft ' : 'published';

  await event.save();

  return event;
}

module.exports = {
  publish,
};
