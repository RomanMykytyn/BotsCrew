const express = require('express');
const router = express.Router();
const Department = require('../models/department');
const Lector = require('../models/lector');

router.post('/list', function(req, res, next) {
  Department.find({}, function(err, departments) {
    var departmentMap = [];
    departments.forEach(function(department) {
      departmentMap.push({id: department._id, name: department.name})
    });
    res.json(departmentMap);
  });
})


router.post('/head', function(req, res, next) {
  Department.findOne({name: req.body.name}).
  populate('head').
  exec(function (err, department) {
    let msg = 'Head of ' + req.body.name + ' is ' + department.head.name + '.';
    res.json({message: msg});
  })
})

module.exports = router;
