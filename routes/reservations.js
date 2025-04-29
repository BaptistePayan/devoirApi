const express = require('express');
const router = express.Router();

const service = require('../services/reservations');
const private = require('../middlewares/privates');

router.get('/', service.getAllReservations);

router.get('/addReservations', service.showAddReservationForm)

router.post('/', service.add);

router.get('/:id', service.getReservationById);

router.get('/edit/:id', service.showUpdateReservationForm);

// (nécessite un token JWT)
router.patch('/:id', private.checkJWT, service.update);

router.delete('/delete/:id', service.delete); 

module.exports = router;