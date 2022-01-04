const express = require('express')
const { getProducts,
     newProduct,
    getSingleProduct, 
      UpdateProduct,
     deleteProduct,
     createProductReview, 
     getProductReviews,
     deleteReview} = require('../controllers/productControllers')
const { isUserAuthenticated , authorizeRoles} = require('../middleware/user')
const router= express()

router.route('/products' ).get(getProducts)
router.route('/product/:id' ).get(getSingleProduct)

router.route('/admin/product/new' ).post(isUserAuthenticated,authorizeRoles('admin','seller'),newProduct)
router.route('/admin/product/:id' )
                                    .put(isUserAuthenticated,authorizeRoles('admin','seller'),UpdateProduct)
                                    .delete(isUserAuthenticated,authorizeRoles('admin','seller'),deleteProduct)

router.route('/review').put(isUserAuthenticated, createProductReview)
router.route('/reviews').get(isUserAuthenticated, getProductReviews)
router.route('/reviews').delete(isUserAuthenticated, deleteReview)

module.exports=router