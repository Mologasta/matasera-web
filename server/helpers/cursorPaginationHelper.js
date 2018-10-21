const { Op } = require('sequelize');
const { PAGINATION } = require('../constants');

const QUERY_BY_DIRECTIONS = {
    [PAGINATION.DIRECTIONS.NEXT]: {
        queryDirection: Op.gt,
        orderDirection: 'ASC'
    },
    [PAGINATION.DIRECTIONS.PREVIOUS]: {
        queryDirection: Op.lt,
        orderDirection: 'DESC'
    }
};

class CursorPaginationHelper {
    /**
     * Get count entities after cursor
     * @param model
     * @param options
     * @param options.cursorValue
     * @param options.cursorKey
     * @param options.direction
     * @param scopes
     */
    static count(model, options = {}, scopes = []) {
        options = CursorPaginationHelper._patchOptions(options);
        if (scopes && scopes.length) {
            model = model.scope(scopes);
        }

        return model.count(options);
    }

    /**
     * Get entities after cursor
     * @param model
     * @param options
     * @param options.cursorValue
     * @param options.cursorKey
     * @param options.direction
     * @param scopes
     */
    static all(model, options = {}, scopes = []) {
        const query = CursorPaginationHelper._patchOptions(options);
        const reverse = options.reverse
            ? options.direction === PAGINATION.DIRECTIONS.NEXT
            : options.direction === PAGINATION.DIRECTIONS.PREVIOUS;
        if (scopes && scopes.length) {
            model = model.scope(scopes);
        }

        return model
            .all(query)
            .then((entities = []) => {
                if (reverse) {
                    return entities.reverse();
                }

                return entities;
            });
    }

    /**
     * Patch query options 
     * @param {*} options 
     */
    static _patchOptions({
        where = {},
        cursorValue = 0,
        cursorKey = 'id',
        direction = PAGINATION.DIRECTIONS.NEXT,
        limit = 1,
        include = [],
        subQuery = true,
    } = {}) {
        const cursorOptions = where[cursorKey] || {};
        let order;

        if (QUERY_BY_DIRECTIONS[direction]) {
            const queryDirection = QUERY_BY_DIRECTIONS[direction].queryDirection;
            const orderDirections = QUERY_BY_DIRECTIONS[direction].orderDirection;
            cursorOptions[queryDirection] = cursorValue;
            order = [[cursorKey, orderDirections]];
        }

        where[cursorKey] = cursorOptions;
        return {
            where,
            limit,
            order,
            include: include && include.length ? include: null,
            subQuery,
        };
    }
}

module.exports = CursorPaginationHelper;