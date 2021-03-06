/**
 * Route.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    attributes: {
        buildDate: 'string',
        builder: 'string',
        difficulty: 'string',
        difficultyColor: 'string',
        gripColor: 'string',
        name: 'string',
        sector: 'string',
        sourceId: 'string',
        tag: 'string',

        ascents: {
            collection: 'ascent',
            via: 'route'
        }
    }
};