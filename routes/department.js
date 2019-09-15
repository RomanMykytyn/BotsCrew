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


router.post('/statistic', function(req, res, next) {
  Department.findOne({name: req.body.name}).
  populate({ path: 'lectors',
             populate: {path: 'lectors'} }).
  exec(function (err, lectors) {
    var countDegree = (arr, degree) => {
      let count = 0;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].degree === degree) count++
      }
      return count;
    }
    res.json({message: 'Ansver:\nassistant - ' + countDegree(lectors.lectors, 'assistant') + ';\n' +
                       'associate professor - ' + countDegree(lectors.lectors, 'associate professor') + ';\n' +
                       'professor - ' + countDegree(lectors.lectors, 'professor') + '.'});
  })
})


router.post('/salary', function(req, res, next) {
  Department.findOne({name: req.body.name}).
  populate({ path: 'lectors',
             populate: {path: 'lectors'} }).
  exec(function (err, lectors) {
    let averageSalary = 0;
    lectors.lectors.forEach( (el) => averageSalary += el.salary );
    res.json({message: 'The average salary of ' + req.body.name + ' is ' + averageSalary + '$.'});
  })
})


router.post('/count', function(req, res, next) {
  Department.findOne({name: req.body.name}).
  populate({ path: 'lectors',
             populate: {path: 'lectors'} }).
  exec(function (err, lectors) {
    res.json({message: 'Ansver: ' + lectors.lectors.length + '.'});
  })
})

module.exports = router;
