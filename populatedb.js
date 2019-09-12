const mongoose = require('mongoose');
const Lector = require('./models/lector');
const Department = require('./models/department');

const uri = "mongodb+srv://roman:20051989@cluster0-vnual.mongodb.net/BotsCrew?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true});

var employees = [];
const employeesName = [
  {name: 'Petro Ivanov'},
  {name: 'Ivan Petrov'},
  {name: 'Taras Shevchenko'},
  {name: 'Ilon Mask'},
  {name: 'Bill Geits'},
  {name: 'Optimus Prime'},
  {name: 'Freddy Krueger'},
  {name: 'Superman'},
  {name: 'Batman'},
  {name: 'Chuck Norris'},
];
const departmentName = [
  {name: 'IT Department'},
  {name: 'Physic Department'},
  {name: 'Economic Department'},
  {name: 'Chemical Department'},
  {name: 'Biologic Department'},
];

async function populatedb() {

  for (let i = 0; i < employeesName.length; i++) {
    var lector = new Lector(employeesName[i]);
    await lector.save();
    employees.push(lector);
  }

  for (let i = 0; i < departmentName.length; i++) {
    var lectors = [];
    var dataDepartment = departmentName[i];
    dataDepartment.head = employees[i];

    for (let j = 0; j < Math.floor(Math.random() * (6 - 3)) + 3; j++) {
      lectors.push({lector: employees[Math.floor(Math.random() * employees.length)]});
    }

    dataDepartment.lectors = lectors;
    let department = new Department(dataDepartment);
    await department.save();
  }
  process.exit();
}

populatedb();
