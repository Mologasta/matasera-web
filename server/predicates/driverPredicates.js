class DriverPredicates {
    /**
     * Status user predicate
     * @returns {function(*, *): *}
     */
    static isOnline(status) {
        return (req, res) => res.locals.user && req.body.online === status;
    }
}

module.exports = DriverPredicates;