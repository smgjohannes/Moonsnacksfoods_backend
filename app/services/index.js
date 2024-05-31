const db = require('../models');
const { generateJwtSecret } = require('../utils/jwtSecret');
const getConfig = require('../utils/getConfig');
const logger = require('../utils/logger');

const Users = require('./users');
const Posts = require('./posts');
const Image = require('./image');
const Token = require('./token');
const Events = require('./events');
const Tastimonials = require('./testimonials');
const Archives = require('./archives');
const Testimonial = require('./testimonials');
const Archive = require('./archives');

/**
 * @description Start a new App instance.
 * @param {object} params - Params when starting App.
 * @example
 * const App = _App();
 */
function App(params = {}) {
  params.jwtSecret = params.jwtSecret || generateJwtSecret();
  const config = getConfig();
  const token = new Token(params.jwtSecret);
  const image = new Image();
  const users = new Users(token, image);
  const posts = new Posts(image);
  const events = new Events(image);
  const testimonials = new Testimonial(image);
  const archives = new Archive(image);

  const _app = {
    config,
    image,
    users,
    posts,
    token,
    events,
    testimonials,
    archives,
    start: async () => {
      // set wal mode
      await db.sequelize
        .authenticate()
        .then(() => {
          logger.debug('DB connected success!');
        })
        .catch((error) => {
          logger.error('DB connection err:', error);
        });

      // Execute DB migrations
      await db.umzug.up();
    },
  };

  // freeze _app object to ensure it's not modified
  return Object.freeze(_app);
}

module.exports = App;
