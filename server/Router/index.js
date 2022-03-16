const Router = require('express');
const dataController = require('../Controller/index')
const router = new Router();

router.get('/getData', dataController.getCurrencyData);

module.exports = router;