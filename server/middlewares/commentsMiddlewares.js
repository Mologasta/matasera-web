const { Comment } = require('../models');

class CommentsMiddlewares {

    /**
     * Create comment middleware
     * @param req
     * @param res
     * @param next
     */
    static addComment(req, res, next) {
        const image = res.locals.image;

        const instance = new Comment({
            text: req.body.text,
            imageId: image.id
        });

        instance
            .save()
            .then(data => res.locals.comment = data)
            .then(() => next())
            .catch(next);
    }

    /**
     * Get comments middleware
     * @param req
     * @param res
     * @param next
     */
    static getComments(req, res, next) {

        Comment
            .find({ imageId: res.locals.image.id })
            .then(results => res.locals.comments = results)
            .then(() => next())
            .catch(next);
    }

    /**
     * Format comments middleware
     * @param req
     * @param res
     * @param next
     */
    static formatComment(req, res, next) {
        res.locals.data = res.locals.comment.baseFormat();
        next();
    }

    /**
     * Format comments middleware
     * @param req
     * @param res
     * @param next
     */
    static formatComments(req, res, next) {
        res.locals.data = res.locals.comments.map(c => c.baseFormat());
        next();
    }
}

module.exports = CommentsMiddlewares;
