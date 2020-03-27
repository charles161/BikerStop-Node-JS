const express = require('express');
const userRouter = express.Router();
const error = require('../helpers/responseHandlers/errorHandler')
const success = require('../helpers/responseHandlers/successHandler')
const { sendResponse } = require('../helpers/responseHandlers/responseSender')
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;

function router() {
 userRouter.route("/register")
  .post((req, res) => {
   const { name, email, password, phone, privilege } = req.body

   if (!name || !email || !password || !phone) {
    sendResponse(res, 400, error("Some parameters are missing"))
    return
   }

   bcrypt.hash(password, saltRounds, function (err, hash) {
    if (err) {
     sendResponse(res, 400, error("Server Error", err))
     return
    }
    let newuser = new User({
     name,
     email,
     password: hash,
     phone,
     privilege: privilege || "USER"
    })

    newuser.save((err) => {
     if (err) {
      sendResponse(res, 400, error("Server Error", err))
      return
     }
     sendResponse(res, 200, success("User registered Successfully"))
     return
    })
   });
  })


 userRouter.route("/login")
  .post((req, res) => {
   const { email, password } = req.body
   User.find({ email }, (err, users) => {
    if (err) {
     sendResponse(res, 400, error("Server Error"))
     return
    }
    if (users.length == 0) {
     sendResponse(res, 400, error("Unable to login"))
     return
    }
    users.forEach(user => {
     if (user.email == email) {
      bcrypt.compare(password, user.password, function (err, result) {
       if (err) {
        sendResponse(res, 400, error("Unable to login", {}))
        return

       }
       if (result) {
        let resUser = user.hasOwnProperty("_doc") ? { ...user._doc } : { ...user }
        delete resUser.password
        sendResponse(res, 200, success("Successful Login", resUser))
        return
       }
       sendResponse(res, 400, error("Unable to login", {}))
       return
      });
     }
    })
   })
  })

 userRouter.route('/all')//gets all users
  .get((req, res) => {
   User.find(null, "-password", (err, users) => {
    if (err) {
     sendResponse(res, 400, error("Couldn't get users", err))
     return
    }
    let resUsers = users.map(user => {
     let resUser = user.hasOwnProperty("_doc") ? { ...user._doc } : { ...user }
     delete resUser.password
     return resUser
    })
    sendResponse(res, 200, success("Successful", resUsers))
    return
   })
  });

 userRouter.route("/:id")//gets a particular user by id
  .get((req, res) => {
   const { id } = req.params
   User.findById(id, (err, user) => {
    if (err) {
     sendResponse(res, 400, error("user not found", err))
     return
    }
    let resUser = user.hasOwnProperty("_doc") ? { ...user._doc } : { ...user }
    delete resUser.password
    sendResponse(res, 200, success("Successful", resUser))
    return
   })
  })

 userRouter.route("/update/:id")//updates an user value
  .post((req, res) => {
   const { id } = req.params
   User.findByIdAndUpdate(id, {
    ...req.body
   }, (err, user) => {
    if (err) {
     sendResponse(res, 400, error("user not found", err))
     return
    }
    sendResponse(res, 200, success("Successfully Updated", {}))
    return
   })
  })

 userRouter.route("/:id")//deletes an user
  .delete((req, res) => {
   const { id } = req.params
   User.findByIdAndDelete(id, (err) => {
    if (err) {
     sendResponse(res, 400, error("user not found", err))
     return
    }
    sendResponse(res, 200, success("Successfully deleted", {}))
    return
   })
  })

 return userRouter;
}

module.exports = router;