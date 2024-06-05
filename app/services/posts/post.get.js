const { Op } = require('sequelize');
const Sequelize = require('sequelize');
const db = require('../../models');

const DEFAULT_OPTIONS = {
  fields: [
    'id',
    'title',
    'short_description',
    'description',
    'slug',
    'overlay_text',
    'status',
    'created_at',
    'updated_at',
  ],
  skip: 0,
  order_dir: 'ASC',
  order_by: 'id',
};

/**
 * @description Get list of users
 * @param {Object} options - Options of the query.
 * @returns {Promise} Return list of users.
 * @example
 * const users = await raceresult.user.get({
 *  take: 20,
 *  skip: 0
 * });
 */
async function get(options) {
  const optionsWithDefault = Object.assign({}, DEFAULT_OPTIONS, options);

  const queryParams = {
    attributes: optionsWithDefault.fields,
    offset: optionsWithDefault.skip,
    order: [[optionsWithDefault.order_by, optionsWithDefault.order_dir]],
  };

  if (optionsWithDefault.take) {
    queryParams.limit = optionsWithDefault.take;
  }

  if (optionsWithDefault.search) {
    queryParams.where = {
      [Op.or]: [
        Sequelize.where(Sequelize.fn('lower', Sequelize.col('title')), {
          [Op.like]: `%${optionsWithDefault.search}%`,
        }),
        Sequelize.where(
          Sequelize.fn('lower', Sequelize.col('shortDescription')),
          {
            [Op.like]: `%${optionsWithDefault.search}%`,
          }
        ),

        Sequelize.where(Sequelize.fn('lower', Sequelize.col('description')), {
          [Op.like]: `%${optionsWithDefault.search}%`,
        }),
        Sequelize.where(Sequelize.fn('lower', Sequelize.col('status')), {
          [Op.like]: `%${optionsWithDefault.search}%`,
        }),
      ],
    };
  }

  const posts = await db.Post.findAll(queryParams);

  const postsPlain = posts.map((post) => {
    // we converted the post to plain object
    const postPlain = post.get({ plain: true });
    return postPlain;
  });

  return postsPlain;
}

module.exports = {
  get,
};
