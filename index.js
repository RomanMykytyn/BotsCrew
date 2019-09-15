const express = require('express');
const indexRouter = require('./routes/startPage');
const departmentRouter = require('./routes/department');
const lectorsRouter = require('./routes/lectors');
const mongoose = require('mongoose');
const app = express();

const uri = "mongodb+srv://roman:20051989@cluster0-vnual.mongodb.net/BotsCrew?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});


app.use(express.static('public'));
app.use(express.static('dist'));
app.use(express.json()) ;
app.use('/', indexRouter);
app.use('/department', departmentRouter);
app.use('/lectors', lectorsRouter);


app.listen(3000, function () {
  console.log('Example app listening on port 3000!!!');
})
