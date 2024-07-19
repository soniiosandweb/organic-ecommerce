const express = require('express');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const { getAllBlogs, getAdminBlogs, createBlog, updateBlog, deleteBlog, getBlogDetails, getLatestBlogs, getRelatedBlogs } = require('../controllers/blogController');

const router = express.Router();

router.route('/blogs').get(getAllBlogs);

router.route('/blog/latest').get(getLatestBlogs);
router.route('/blog/related/:id').get(getRelatedBlogs);

router.route('/admin/blogs').get(isAuthenticatedUser, authorizeRoles("admin"), getAdminBlogs);
router.route('/admin/blog/new').post(isAuthenticatedUser, authorizeRoles("admin"), createBlog);

router.route('/admin/blog/:id')
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateBlog)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteBlog);

router.route('/blog/:id').get(getBlogDetails);

module.exports = router;