const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');


 router.get('/', passport.authenticate('google', {
       scope: ['profile', 'email']
  })
     );
     router.get('/callback', passport.authenticate('google'));

     router.get('/api/logout', (req, res) => {
      req.logout();
      res.send(req.user);
     });

     router.get('/api/current_user', (req, res) => {
       res.send(req.user);
     });
  
  module.exports = router;