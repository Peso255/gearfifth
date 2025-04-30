var express = require('express');
var router = express.Router();
var db = require('../mongo');

/* GET courses listing. */
router.get('/courses', function(req, res, next) {
  db.getCourses().then(function(result) {res.send(result)});
});

/* GET user listing of a particular course. */
router.get('/users/:id', function(req, res, next) {
  db.getUsersofCourse(req.params.id).then(function(result) {res.send(result)});
})

module.exports = router;
