const { Image } = require('../models');
const LocalizationDictionary = require('../locale');

class ImagesMiddlewares {

    /**
     * Save image middleware
     * @param req
     * @param res
     * @param next
     */
    static saveData(req, res, next) {
        const instance = new Image({ path: res.locals.image });

        instance
            .save(res.locals.photo)
            .then(image => res.locals.image = image)
            .then(() => next())
            .catch(next)
    }
}

module.exports = ImagesMiddlewares;
