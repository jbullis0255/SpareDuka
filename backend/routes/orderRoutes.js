const express = require('express')
const {
    newOrder, 
    getSingleOrder,
     myOrders, 
     allOrders,
      updateOrder,
     deleteOrder} = require('../controllers/ordercontrollers')
     
const { isUserAuthenticated , authorizeRoles} = require('../middleware/user')
const router = express.Router()


router.route('/order/new').post(isUserAuthenticated, newOrder)

router.route('/order/:id').get(isUserAuthenticated, getSingleOrder)
router.route('/orders/me').get(isUserAuthenticated, myOrders)

router.route('/admin/orders').get(isUserAuthenticated, authorizeRoles('admin'),allOrders)
router.route('/admin/order/:id')
                                .put(isUserAuthenticated, authorizeRoles('admin'),updateOrder)
                                .delete(isUserAuthenticated, authorizeRoles('admin'),deleteOrder)

module.exports =router