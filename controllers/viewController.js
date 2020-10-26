const Resource = require('../models/resourceModel');
const resourceModel = require('../models/resourceModel');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  const resources = await Resource.find();

  res.status(200).render('overview', {
    title: 'All Resources',
    resources: resources,
  });
});
