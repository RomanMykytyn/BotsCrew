const express = require('express');
const router = express.Router();
const Department = require('../models/department');
const Lector = require('../models/lector');

router.post('/', function(req, res, next) {
  Department.findOne({name: req.body.name}).
  populate('head').
  exec(function (err, department) {
    let msg = 'Head of ' + req.body.name + ' is ' + department.head.name + '.';
    res.json({message: msg});
  })
})


module.exports = router;
