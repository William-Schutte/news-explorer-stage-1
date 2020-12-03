const NotFoundError = require('../errors/notFoundError');
const Article = require('../models/article');

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

const addArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;

  Article.create({ keyword, title, text, date, source, link, image, owner: req.user._id })
    .then((article) => res.status(201).send({ data: article }))
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  Article.findOneAndRemove({ _id: req.params.articleId, owner: req.user._id })
    .then((article) => res.send({ data: article, message: 'Article successfully deleted' }))
    .catch(() => next(new NotFoundError('Article not found or incorrect owner')));
};

module.exports = {
  getArticles,
  addArticle,
  deleteArticle,
};
