const fs = require('fs');

/**
 * Universal error handler
 * @param err
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
module.exports = (err, req, res, next) => {
    if (!err) {
        return next();
    }

    if (req.file || req.files) {
        let files = req.files || [req.file];
        Object
            .keys(files)
            .forEach(fileName => {
                Array.isArray(files[fileName])
                    ? removeFiles(files[fileName])
                    : removeFile(files[fileName]);
            });
    }

    if (res.locals.transaction && !res.locals.transaction.finished) {
        res.locals.transaction.rollback();
    }
    res.sendError(err);
};

function removeFiles(files = []) {
    return files.forEach(removeFile);
}

function removeFile(file) {
    fs.unlink(file.path);
}