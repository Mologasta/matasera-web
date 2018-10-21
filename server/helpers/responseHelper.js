const _ = require('lodash');

const { PAGINATION } = require('../constants');

const DECIMAL_RADIX = 10;

class ResponseHelper {
    /**
     * Create pagination object
     * @param {*} request 
     * @param {*} response 
     */
    static createPagination(request, response) {
        return request.query.cursor !== undefined
            ? ResponseHelper.createCursorPagination(request, response)
            : ResponseHelper.createOffsetPagination(request, response);
    }

    /**
     * Create offset based pagination object
     * @param {*} request 
     * @param {*} response 
     */
    static createOffsetPagination(request, response) {
        const limit = parseInt(request.query.limit, DECIMAL_RADIX) || 1;
        const offset = parseInt(request.query.offset, DECIMAL_RADIX) || 0;
        const page = Math.floor(offset / limit + PAGINATION.FIRST_PAGE_NUMBER);
        const data = response.locals.data || [];
        const totalCount = response.locals.count || data.length;

        return {
            totalCount,
            nextOffset: request.pagination && offset + limit < totalCount ? offset + limit : null,
            nextPage: request.pagination && offset + limit < totalCount ? page + 1 : null,
        };
    }

    /**
     * Create cursor based pagination object
     * @param {*} request 
     * @param {*} response 
     */
    static createCursorPagination(request, response) {
        let nextCursor; 
        const totalCount = response.locals.count || response.locals.data.length;
        const data = response.locals.data || [];
        const countLeft = totalCount - data.length;
        
        if(request.query.direction === PAGINATION.DIRECTIONS.NEXT) {
            const itemWithMaxId = _.maxBy(data, 'id');
            nextCursor = itemWithMaxId && itemWithMaxId.id;
        }
        if(request.query.direction === PAGINATION.DIRECTIONS.PREVIOUS) {
            const itemWithMinId = _.minBy(data, 'id');
            nextCursor = itemWithMinId && itemWithMinId.id;
        }


        return { 
            countLeft,
            nextCursor: countLeft? nextCursor: null,
            direction: request.query.direction
        };
    }
}

module.exports = ResponseHelper;