const { Authors }  = require('../models');

const getAllAuthors = () => {
    return Authors.find({is_active:true});
}

module.exports = {
    getAllAuthors
}