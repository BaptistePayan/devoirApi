//permet de manipuler les données des "Users"

const User = require('../models/users');
const bcrypt = require('bcryptjs');   
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const apiUrl = process.env.API_URL;


exports.getUserById = async (req, res) => {    //ajout d'un user par id
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}  ;

exports.add = async (req, res) => {  //ajout d'un user
    const { username, password, email } = req.body;
    try {
        const user = new User({ username, password, email });
        await user.save();
        res.render('users/addUsers', { users: user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.update = async (req, res) => {     //modifier un user
    const { username, password, email } = req.body;
    try {
        
        let updatedFields = { username, email };
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updatedFields.password = hashedPassword;
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            updatedFields,
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.delete = async (req, res) => {  //supprimer un User
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.authenticate = async (req, res, next) => {
    const { email, password } = req.body;
    console.log('Tentative de connexion pour l\'utilisateur :', email);
    console.log("Clé secrète utilisée pour générer le token :", SECRET_KEY);
  
    try {
      // Recherche de l'utilisateur par email
      let user = await User.findOne({ email: email }, "-__v -createdAt -updatedAt");
     
  
      // Vérifier si l'utilisateur existe
      if (!user) {
        return res.status(404).json({ message: "user_not_found" });
        
      }
      console.log('Utilisateur trouvé :', user);
  
      // Comparer le mot de passe
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        console.log('Mot de passe incorrect pour l\'utilisateur :', email);
        return res.status(403).json({ message: "informations incorrectes" });
      }
  
      // Supprimer le mot de passe de l'objet utilisateur avant de l'envoyer
      delete user._doc.password;
  
      // Créer un token JWT
      const expiresIn = 24 * 60 * 60; // Durée de validité du token (24 heures)
      const token = jwt.sign({ user: user }, SECRET_KEY, { expiresIn });
  
      // Ajouter le token dans l'en-tête Authorization
      res.header("Authorization", "Bearer " + token);
  
      // Réponse avec le token JWT
      return res.status(200).json({ message: "authentification réussie", token: token });
  
    } catch (error) {
      console.error("Error authenticating user:", error);  // Ajout de log détaillé
      return res.status(500).json({ message: "Error authenticating user", error: error.message });
    }
  };
  
  
  
  exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); // Récupère tous les utilisateurs
       res.render('users/listUsers', { users }); // Rends la vue listUsers avec la liste des utilisateurs
       //* res.json(users); // Envoie la liste des utilisateurs en JSON
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
  