const db = require('../../models');
const { NotFoundError } = require('../../utils/coreErrors');

/**
 * @private
 * @description This function return a payment by id
 * @name app.payments.getBySlug
 * @param {string} slug - The id of the payment.
 * @returns {Promise} Promise.
 * @example
 * await app.payments.getBySlug('about-us');
 *
 */
async function getBySlug(slug) {
  const payment = await db.Payment.findOne({
    where: { slug },
    include: {
      model: db.Member,
      attributes: ['id', 'surname', 'name'],
    },
  });

  if (payment === null) {
    throw new NotFoundError(`payment not found`);
  }

  return payment;
}

module.exports = {
  getBySlug,
};
