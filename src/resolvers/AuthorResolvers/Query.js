const { getAllAuthors } = require('../../services/AuthorService'); 

// Creamos un contexto asíncrono
const getAuthors = async () => {
    const authors = await getAllAuthors();
    return authors;
};

module.exports = {
    getAuthors
}