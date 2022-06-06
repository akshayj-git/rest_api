var express = require('express');
var router = express.Router();

const userController = require('../controllers/post');

//Post Method
router.post('/post', userController.postData);

//Get all Method
router.get('/getAll', userController.getAllData);

//Get by ID Method
router.get('/getOne/:id', userController.getOneData);

//Update by ID Method
router.post('/update/:id', userController.updateData);

//Delete by ID Method
router.post('/delete/:id', userController.deleteData);

module.exports = router;
