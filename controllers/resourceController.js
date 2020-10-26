const AppError = require('../utils/appError');
const Resource = require('./../models/resourceModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllResources = catchAsync(async (req, res, next) => {
  //req.query is de parameter in url bv. ?onderwerp=HTML5
  const queryObj = { ...req.query };
  const excludeFields = ['page', 'sort', 'limit', 'fields'];
  excludeFields.forEach((el) => delete queryObj[el]);

  let resources = await Resource.find(queryObj);

  res.status(200).json({
    status: 'sucsess',
    results: resources.length,
    data: {
      resource: resources,
    },
  });
});

exports.getOneResource = catchAsync(async (req, res, next) => {
  const resource = await Resource.findById(req.params.id);

  if (!resource) {
    return next(new AppError('No resource found with that ID', 404));
  }

  res.status(200).json({
    status: 'sucsess',
    data: {
      resource: resource,
    },
  });
});

exports.createResource = catchAsync(async (req, res, next) => {
  const newResource = await Resource.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      knowledge: newResource,
    },
  });
});

exports.updateResource = catchAsync(async (req, res, next) => {
  const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!resource) {
    return next(new AppError('No resource found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      resource: resource,
    },
  });
});

exports.deleteResource = catchAsync(async (req, res, next) => {
  const resource = await Resource.findByIdAndDelete(req.params.id);

  if (!resource) {
    return next(new AppError('No resource found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
