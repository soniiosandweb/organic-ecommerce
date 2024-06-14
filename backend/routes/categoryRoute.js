const express = require('express');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const { getAllCategories, updateCategory, deleteCategory, getSingleCategory, addCategory } = require('../controllers/categoryController');

const router = express.Router();

router.route('/categories').get(getAllCategories);

router.route('/admin/category/add').post(isAuthenticatedUser, authorizeRoles("admin"), addCategory);

router.route("/category/:id").get(getSingleCategory)

router.route('/admin/category/:id')
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateCategory)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteCategory);

module.exports = router;