const express = require('express');

const itemRouter = express.Router();
let error = require('../helpers/responseHandlers/errorHandler')
let success = require('../helpers/responseHandlers/successHandler')

function router() {
 itemRouter.route('/')
  .get((req, res) => {
   res.json(success("this route handles requests for item stuff"))
  });
 return itemRouter;
}

module.exports = router;