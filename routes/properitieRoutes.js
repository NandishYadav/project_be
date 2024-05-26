const properitieController = require('./../controllers/properities');
const usersController = require('./../controllers/users');

const router = require('express').Router();

router.post('/add',usersController.authentication, properitieController.createProperitie);
router.post('/all', properitieController.getProperities);
router.get('/:id', properitieController.getProperitieById);
router.post('/:id', usersController.authentication,properitieController.updateProperitie);


module.exports = router;