const moongose = require('mongoose');
const slugify = require('slugify');

const resourceSchema = new moongose.Schema({
  onderwerp: {
    type: String,
    required: [true, 'Een onderwerp moet ingevuld worden'],
  },
  type: {
    type: String,
    required: [true, 'Een type moet gekozen worden'],
    enum: {
      values: ['website', 'video'],
      message: 'Type kan alleen website of video zijn',
    },
  },
  name: {
    type: String,
    required: [true, 'Een naam moet ingevuld worden'],
    unique: true,
    trim: true,
  },
  slug: String,
  summary: {
    type: String,
    trim: true,
  },
  link: {
    type: String,
    required: [true, 'Een link moet ingevuld worden'],
  },
  linkText: String,
});

//document middleware: pre => runs before a save of create
resourceSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Resource = moongose.model('Resource', resourceSchema);

module.exports = Resource;
