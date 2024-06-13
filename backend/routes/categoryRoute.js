const express = require('express');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const { getAllCategories, updateCategory, deleteCategory, getSingleCategory, addCategory } = require('../controllers/categoryController');

const router = express.Router();

router.route('/categories').get(getAllCategories);

router.route('/admin/category/delete').delete(isAuthenticatedUser, authorizeRoles("admin"), deleteCategory);

router.route('/admin/category/update').put(isAuthenticatedUser, authorizeRoles("admin"), updateCategory);

router.route('/admin/category/add').post(isAuthenticatedUser, authorizeRoles("admin"), addCategory);

router.route("/category/:id").get(getSingleCategory)

module.exports = router;