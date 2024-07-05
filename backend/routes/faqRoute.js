const express = require('express');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const { getAllFaqs, updateFaq, deleteFaq, getFaqDetails, addFaq } = require('../controllers/faqController');

const router = express.Router();

router.route('/faqs').get(getAllFaqs);

router.route('/admin/faq/add').post(isAuthenticatedUser, authorizeRoles("admin"), addFaq);

router.route("/faq/:id").get(getFaqDetails)

router.route('/admin/faq/:id')
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateFaq)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteFaq);

module.exports = router;