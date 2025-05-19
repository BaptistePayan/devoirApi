// Ce module initialise la connexion à la base de données MongoDB en utilisant Mongoose. préalablement initialisé dans l'environnement

const mongoose = require('mongoose');
const apiUrl = process.env.API_URL;

const clientOptions = {
  dbName: 'Port',
};


module.exports.initClientDbConnection = async () => {  
    try {
        await mongoose.connect(process.env.URL_MONGO, clientOptions);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        throw error;
    }
};
