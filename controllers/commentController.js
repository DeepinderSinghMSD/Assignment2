const { Comment } = require('../templets');

// for creating a new comment
exports.createComment = async (req, res) => {
    try {
        const comment = new Comment(req.body);
        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            res.status(400).json({ error: errors.join(', ') });
        } else {
            res.status(400).json({ error: error.message });
        }
    }
};

// for getting all comments
exports.getComments = async (req, res) => {
    try {
        const comments = await Comment.find().populate('product user');
        res.status(200).json(comments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// for getting one single comment
exports.getComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id).populate('product user');
        if (!comment) return res.status(404).json({ message: 'Comment has not been found' });
        res.status(200).json(comment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// for updating the comment
exports.updateComment = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!comment) return res.status(404).json({ message: 'Comment has not been found' });
        res.status(200).json(comment);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            res.status(400).json({ error: errors.join(', ') });
        } else {
            res.status(400).json({ error: error.message });
        }
    }
};

// for deleting a comment
exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        if (!comment) return res.status(404).json({ message: 'Comment has not been found' });
        res.status(200).json({ message: 'Comment is deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
