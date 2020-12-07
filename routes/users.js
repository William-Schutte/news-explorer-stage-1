const router = require('express').Router();
const { getUserInfo } = require('../controllers/users');

// Only one route for /users, gets info on currently authorized user
router.get('/me', getUserInfo);

module.exports = router;
