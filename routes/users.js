const express = require('express');
const router = express.Router();

const service = require('../services/users');
const private = require('../middlewares/privates');
const userService = require('../services/loginFromForm');

/* GET users listing. */
router.get('/addUsers', (req, res) => {
  res.render('users/addUsers')
})

router.get('/dashboard', (req, res) => {
  res.render('dashboard'); 
});

router.get('/:id', private.checkJWT, service.getUserById);

router.post('/', service.add);

router.patch('/:id', private.checkJWT, service.update);

router.delete('/:id', service.delete);

router.post('/authenticate', service.authenticate);

router.post('/login-form', userService.loginFromForm);

router.get('/', service.getAllUsers)


module.exports = router;
