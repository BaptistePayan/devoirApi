const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//permet de hasher des expressions
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  username: { type: String, trim: true, required: [true, 'Le nom est requis'] },
  email: { type: String, trim: true, required: [true, "L'email est requis"], unique: true, lowercase: true },  //index unique, minuscule
  password: { type: String, trim: true, required: [true, 'Le mot de passe est requis'],  minlength: [6, 'Le mot de passe doit contenir au moins 6 caractères']}
}, { 
  timestamps: true 
});


UserSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

// Export du modèle
module.exports = mongoose.model('User', UserSchema);