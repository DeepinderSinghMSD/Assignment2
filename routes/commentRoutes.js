const express = require('express');
const { createComment, getComments, getComment, updateComment, deleteComment } = require('../controllers/commentController');
const router = express.Router();

router.post('/', createComment);
router.get('/', getComments);
router.get('/:id', getComment);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);

module.exports = router;
