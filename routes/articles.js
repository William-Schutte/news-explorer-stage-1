const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getArticles, addArticle, deleteArticle } = require('../controllers/articles');

// Article routes below for retrieving saved articles, adding and deleting articles
router.get('/', getArticles);
router.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required(),
    image: Joi.string().required(),
  }),
}), addArticle);
router.delete('/:articleId', deleteArticle);

module.exports = router;
