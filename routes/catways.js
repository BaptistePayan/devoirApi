const express = require('express');
const router = express.Router();  
const apiUrl = process.env.API_URL;  

const service = require('../services/catways');
const private = require('../middlewares/privates');  



router.get('/', service.getAllCatways);

router.get('/addCatways', service.showAddForm); 

router.post('/addCatways', service.add);

router.get('/editCatways/:id', service.showEditForm);

router.post('/editCatways/:id', service.update); 

router.post('/delete/:id', service.delete);



router.patch('/:id', private.checkJWT, service.update);

router.delete('/:id', private.checkJWT, service.delete);


router.get('/:id', service.getCatwayById);

module.exports = router;