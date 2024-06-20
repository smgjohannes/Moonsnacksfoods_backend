const db = require('../../models');
const handleDatabaseError = require('../../utils/errorHandlers');
const imageService = require('../image/actions/image.destroy'); // Adjust path as necessary

async function destroy(id, res) {
  try {
    const payment = await db.Payment.findOne({
      where: { id },
      include: {
        model: db.Member,
        attributes: ['id', 'surname', 'name'],
      },
    });

    if (!payment) {
      throw new Error('payment not found');
    }

    await payment.destroy();
    return { message: 'payment and associated images deleted successfully.' };
  } catch (error) {
    handleDatabaseError(error, res);
    throw error;
  }
}

module.exports = {
  destroy,
};
