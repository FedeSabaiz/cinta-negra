const AuthorResolvers = require('./AuthorResolvers');

module.exports = {
    Query: {
        ...AuthorResolvers
    },
    Mutation: {

    }
};