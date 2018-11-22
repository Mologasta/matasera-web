const schema = require('./schema');


schema.method({
    baseFormat: function() {
        return {
            id: this.id,

            text: this.text,

            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString(),
        };
    },
});

module.exports = {
    name: 'Comment',
    schema: schema,
};
