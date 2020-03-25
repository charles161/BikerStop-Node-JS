const express = require('express');

const userRouter = express.Router();
let error = require('../helpers/responseHandlers/errorHandler')
let success = require('../helpers/responseHandlers/successHandler')

function router() {
 userRouter.route('/register')
  .post((req, res) => {
   const { email, password, country, mobile } = req.body;
   //do something here
   res.status(200);// even if u didnt set the by default its 200
   res.json(success('some message', {}))
  });
 userRouter
  .route('/login')
  .post((req, res) => {
   const { email, password } = req.body;
   //do something here
   res.json(success("some message", {}))
  });
 userRouter.route('/')
  .get((req, res) => {
   res.json(success("this route handles requests for user stuff"))
  });
 return userRouter;
}

module.exports = router;