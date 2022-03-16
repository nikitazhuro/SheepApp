const Router = require('express');
const router = new Router();
const dataController = require('../Controller/index')

router.get('/getData', dataController.getCurrencyData);

module.exports = router;