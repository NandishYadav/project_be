const properitieController = require('./../controllers/properities');
const usersController = require('./../controllers/users');

const router = require('express').Router();


//check if the user is authenticated before adding a properitie
router.post('/add',usersController.authentication, properitieController.createProperitie);

//get all the listing of properities
router.post('/all', properitieController.getProperities);

//get a single properitie by id
router.get('/:id', properitieController.getProperitieById);

//update a properitie by id
router.post('/:id', usersController.authentication,properitieController.updateProperitie);


module.exports = router;