const express = require('express');
const router = express.Router();

const UserController = require('../controllers/users');

router.get('/', UserController.get_all_users);
router.post('/signup', UserController.create_user);
router.post('/login', UserController.user_login);
router.get('/:userId', UserController.get_users_user);
router.delete('/:userId', UserController.delete_user);
router.patch('/:userId', UserController.update_user);

module.exports = router;