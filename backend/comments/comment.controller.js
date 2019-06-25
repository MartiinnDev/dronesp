const express = require('express');
const router = express.Router();
const commentService = require('./comment.service');

// routes
// router.post('/comment', register);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.post('/', create)
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
  commentService.getAll()
        .then(comments => res.json(comments))
        .catch(err => next(err));
}

function getById(req, res, next) {
  commentService.getById(req.params.id)
        .then(comment => comment ? res.json(comment) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
  commentService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function create(req, res, next) {
  commentService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
  commentService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}