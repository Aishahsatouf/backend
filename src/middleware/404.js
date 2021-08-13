'use strict';

module.exports = (req,res,next) => {
  const errorObject = {
    status: 404,
    message: 'Sorry,Page not found'
  }

  res.status(404).json(errorObject);
};