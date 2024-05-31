const db = require('../../models');
const { Error400 } = require('../../utils/httpErrors');

async function destroy(id, res) {
  try {
    const testimonial = await db.Testimonial.findOne({
      where: { id },
      include: {
        model: db.Image,
        attributes: ['id', 'url', 'type'],
      },
    });

    if (!testimonial) {
      throw new Error('Testimonial not found');
    }

    console.log(testimonial.path);

    if (testimonial.Images && testimonial.Images.length > 0) {
      for (let img of testimonial.Images) {
        await this.image.destroy(img.id);
      }
    }

    await testimonial.destroy();
    return {
      message: 'Testimonial and associated images deleted successfully.',
    };
  } catch (error) {
    throw new Error400(error.message);
  }
}

module.exports = {
  destroy,
};
