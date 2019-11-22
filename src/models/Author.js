const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Siempre debe tener el typo
const AuthorSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    birth_date: {
        type: Date,
    },
    gender: {
        type: String,
        enum: ['M', 'F', 'O']
    },
    posts: {
        type: [Schema.Types.ObjectId],
        ref: 'posts'
    },
    is_active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps:true
});

// El primer parámetro de model es author y el segundo es la configuración que se creó
module.exports = mongoose.model('author', AuthorSchema);