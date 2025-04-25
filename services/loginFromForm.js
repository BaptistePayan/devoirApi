// connexion
const User = require('../models/users');
const bcrypt = require('bcryptjs'); 

exports.loginFromForm = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.render('acceuil', { error: 'Utilisateur non trouvé' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password); // Utilisation de bcryptjs pour comparer le mot de passe
        if (!isPasswordValid) {
            return res.render('acceuil', { error: 'Mot de passe incorrect' });
        }

        // Stocker l'ID utilisateur en session
        req.session.userId = user._id;

        // Rediriger vers le dashboard après l'authentification réussie
        res.redirect('/dashboard');
    } catch (error) {
        console.error("Erreur d'authentification via formulaire :", error);
        res.status(500).send("Erreur serveur");
    }
};