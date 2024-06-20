const fs = require('fs');
const db = require('../../models');
const { Error400 } = require('../../utils/httpErrors');
const { upload } = require('../image/actions/image.upload');

async function update(id, data, req) {
  try {
    const payment = await db.Payment.findByPk(id, {
      include: {
        model: db.Member,
        attributes: ['id', 'surname', 'name'],
      },
    });

    if (!payment) {
      throw new Error('payment not found');
    }

    await payment.update(data);

    return payment;
  } catch (error) {
    console.error(error);
    throw new Error400(error.message);
  }
}

module.exports = {
  update,
};
