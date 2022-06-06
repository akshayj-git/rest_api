var express = require('express');
var router = express.Router();

const userController = require('../controllers/user');
const postController = require('../controllers/post');

const auth = require("../middleware/is-auth");

//Post Method
router.post('/login', userController.login);

//Post Method
router.post('/register', userController.register);

//Post Method
router.post('/post', auth, postController.postData);

//Get all Method
router.get('/getAll', auth, postController.getAllData);

//Get by ID Method
router.get('/getOne/:id', auth, postController.getOneData);

//Update by ID Method
router.post('/update/:id', auth, postController.updateData);

//Delete by ID Method
router.post('/delete/:id', auth, postController.deleteData);

module.exports = router;
