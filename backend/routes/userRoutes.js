const express= require('express');
const { registerUser,
     loginUser, 
     logout, 
     forgotPassword, 
     resetPassword, 
     updatePassword,
     getUserProfile, 
     allUsers,
     getUserDetails,
     updateProfile,
     deleteUser,
     updateUser} = require('../controllers/userControllers');

const router= express.Router()

const {isUserAuthenticated, authorizeRoles} = require('../middleware/user')

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)

router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)

router.route('/me').get(isUserAuthenticated, getUserProfile)
router.route('/password/update').put(isUserAuthenticated, updatePassword)
router.route('/me/update').put(isUserAuthenticated, updateProfile)

router.route('/admin/users').get(isUserAuthenticated,authorizeRoles('admin'),allUsers)
router.route('/admin/user/:id')
                                .get(isUserAuthenticated,authorizeRoles('admin'),getUserDetails)
                                .put(isUserAuthenticated,authorizeRoles('admin'),updateUser)
                                .delete(isUserAuthenticated,authorizeRoles('admin'),deleteUser)

router.route('/logout').get(logout)

module.exports = router