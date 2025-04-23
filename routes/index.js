var express = require('express');
var router = express.Router();
const User = require('../models/users');
const private = require('../middlewares/privates');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('acceuil'); //affiche ejs
});


router.get('/dashboard', private.checkJWT, async function(req, res) {
  try {
    const user = req.decoded.user; 
    if (!user) {
      return res.redirect('/');
    }

    res.render('dashboard', { user });
  } catch (error) {
    console.error("Erreur lors de l'accès au tableau de bord :", error);
    res.status(500).send("Erreur serveur");
  }
});

router.post('/dashboard', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.render('acceuil', { error: 'Utilisateur non trouvé' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.render('acceuil', { error: 'Mot de passe incorrect' });
    }

    const token = jwt.sign({ user: { id: user._id, email: user.email, username: user.username } }, process.env.SECRET_KEY, { expiresIn: '1h' });

    res.cookie('auth_token', token, {
      httpOnly: true,  
      secure: process.env.NODE_ENV === 'production', 
      maxAge: 60 * 60 * 1000  //durée de 1heure
    });

    
    res.redirect('/dashboard');
  } catch (error) {
    console.error("Erreur lors de l'authentification :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
