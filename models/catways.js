const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const apiUrl = process.env.API_URL;

const CatwaySchema = new Schema({
  catwayNumber: {
    type: String,
    trim: true,
    required: [true, 'Le numéro du catway est requis'],
    unique: true
  },
  catwayType: {
    type: String,
    trim: true,
    required: [true, 'Le type du catway est requis'],
    enum: {
      values: ['long', 'short'],
      message: 'Le type doit être soit "long", soit "short"'
    }
  },
  catwayState: {
    type: String,
    trim: true,
    required: [true, 'L\'état du catway est requis']
  }
}, {
  timestamps: true // ajoute automatiquement createdAt et updatedAt
});

module.exports = mongoose.model('Catway', CatwaySchema);