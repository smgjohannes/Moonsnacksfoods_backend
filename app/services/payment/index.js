const { create } = require('./payment.create');
const { get } = require('./payment.get');
const { getById } = require('./payment.getById');
const { getBySlug } = require('./payment.getBySlug');
const { update } = require('./payment.update');
const { destroy } = require('./payment.destroy');

class Payment {
  constructor(image) {
    this.image = image;
  }
}

Payment.prototype.get = get;
Payment.prototype.getById = getById;
Payment.prototype.create = create;
Payment.prototype.update = update;
Payment.prototype.getBySlug = getBySlug;
Payment.prototype.destroy = destroy;

module.exports = Payment;
