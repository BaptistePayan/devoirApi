const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({  
    catwayNumber: {
        type: String,
        trim: true,
        required: [true, 'Le numéro du catway est requis'],
        unique: true
    },
    clientName: {
        type: String,
        trim: true,
        required: [true, 'Le nom du client est requis']
    },
    boatName: {
        type: String,
        trim: true,
        required: [true, 'Le nom du bateau est requis']
    },
    startDate: {
        type: Date,
        required: [true, 'La date de début est requise']
    },
    endDate: {
        type: Date,
        required: [true, 'La date de fin est requise']
    }
    });

   module.exports = mongoose.model('Reservations', ReservationSchema);