
const express = require('express')
const router = express.Router()
const { addOrder , searchOrders, updateOrder} = require('../controllers/orders')

router.post('/addOrder',addOrder)
router.get('/searchOrders',searchOrders)
router.get('/updateOrder',updateOrder)

module.exports = router