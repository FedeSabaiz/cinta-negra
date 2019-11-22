// Esta es al configuración para crear un proyecto nuevo

require('dotenv').config();

const { GraphQLServer } = require('graphql-yoga');
const { importSchema } = require('graphql-import');
const resolvers = require('./src/resolvers/index');

const mongoose = require('mongoose');   

//Creación de variable genérica
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

// Se crea la conexión
const mongo = mongoose.connection;

mongo.on('error', (error) => console.log(error))
    .once('open', () => console.log('Connected to database'));

// Dirname es una variable que tiene acceso al directorio actual
const typeDefs = importSchema(__dirname + '/schema.graphql');

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => console.log('Estamos en linea'));