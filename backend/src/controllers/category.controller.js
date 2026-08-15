/**
 * category.controller.js
 */

const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const categoryModel = require('../models/category.model');

const getAll = asyncHandler(async (req, res) => {
    const categories = await categoryModel.findAll();
    new ApiResponse(200, categories).send(res);
});

module.exports = { getAll };
