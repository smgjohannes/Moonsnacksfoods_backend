const db = require('../../models');

async function create(payload, req) {
  let createdPayment = await db.Payment.create(payload);

  return createdPayment;
}

module.exports = { create };
