const { GraphQLServer } = require('graphql-yoga');

/*
    1.- Traer solo un usuario
    2.- Actualizar un usuario
*/

// Type defs
const typeDefs = `
    type Query{
        hello(name:String):String!
        getUsers:[User]!
        getUser(id:ID):User!
    }

    type Mutation{
        createUser(name:String!, age: Int!):User
        updateUser(id:ID!, name:String, age: Int):User
    }

    type User{
        id:Int!
        name:String!
        age:Int!
    }
`;

// Base de usurios
const users = [];

// Resolvers
const resolvers = {
    Query: {
        hello:(root, params, context, info) => `Hola ${params.name}`,
        getUsers:(root, params, context, info) => users,
        getUser:(root, params, context, info) => {
            for(let i = 0; i<= users.length; i++) {
                if(users[i].id === parseInt(params.id)) {
                    return users[i];
                }
            } 
        }
    },
    Mutation: {
        createUser:(root, params, context, info) => {
            const user = {
                id: users.length + 1000,
                name: params.name,
                age: params.age
            };
            users.push(user);
            return user;
        },
        updateUser:(root, params, context, info) => {
            console.log(params)
            for(let i = 0; i<= users.length; i++) {
                if(users[i].id === parseInt(params.id)) {
                    const user = {
                        id: params.id,
                        name: params.name,
                        age: params.age
                    }
                    // Aquí se actualiza el usuario con el método splice
                    users.splice(i, 1, user)
                    return user;
                }
            }
        }
    }
};
//root -> Traer información de graphql
// params -> Son los datos que envía el cliente y que se define en nuestro typedefs
// context -> Objeto por el cual se comunican los resolvers(Auth) Se pueden verificar diferentes cosas
// info -> Es el query que se ejecutó en el cliente, es decir, cuando se manda a llamar

// Montar servidor
const server = new GraphQLServer({
    typeDefs,
    resolvers
});

// Iniciamos el servidor
server.start(() => console.log('Ya está'));