const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { userSignup, userLogin } = require('../controllers/users');
const auth = require('../middleware/auth');
const usersRouter = require('./users');
const articlesRouter = require('./articles');

// This is the main router, all requests are processed here

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), userSignup);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), userLogin);

router.use('/users', auth, usersRouter);
router.use('/articles', auth, articlesRouter);

module.exports = router;
