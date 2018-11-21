const schema = require('./schema');


schema.method({
    baseFormat: function() {
        return {
            id: this.id,

            path: this.path,
            location: this.location,

            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString(),
        };
    },
});

module.exports = {
    name: 'Image',
    schema: schema,
};
