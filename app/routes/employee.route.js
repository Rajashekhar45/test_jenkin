
var employee = require("../controllers/employee/employee.js");
var router = require("express").Router();


router.post("/", employee.create);
module.exports = router;  