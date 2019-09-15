const express = require('express');
const router = express.Router();
const Lector = require('../models/lector');

router.post('/search', function(req, res, next) {
  Lector.find({name: {$regex: req.body.searchString, $options: 'i'}}, function(err, lectors) {
    let msg = '';
    lectors.forEach( (el) => msg += el.name + '\n' );
    res.json({message: msg});
  });
})


module.exports = router;
