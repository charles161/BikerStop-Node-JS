
const express = require('express');

const orderRouter = express.Router();
let error = require('../helpers/responseHandlers/errorHandler')
let success = require('../helpers/responseHandlers/successHandler')

function router() {
 orderRouter.route('/')
  .get((req, res) => {
   res.json(success("this route handles requests for order stuff"))
  });
 return orderRouter;
}

module.exports = router;