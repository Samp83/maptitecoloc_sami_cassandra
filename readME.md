DOCUMENTATION :

CHOIX TECHNIQUES: - TypeORM: gestions des utilisateurs, des colocs et des finances avec leurs relations - Mongodb: gestion des logs créant becoups de données
Nous sommes assez familiers avec ces bases de données et que nous avons déjà utilisé.

    Gestion des erreurs au plus simples possible, à améliorer de manière plus générale et détaillée.
    Gestion des logs pour les actions effectuées au plus simples possible, à améliorer de manière à catégoriser les logs.

POSTMAN :

Routes User :

// Route pour l'inscription d'un utilisateur
POST /api/users/register

exemple de requête:

{
"firstname": "test",
"lastname": "test",
"email": "test@gmail.com",
"is18": true,
"isAdmin": false,
"password" : "password"
}

// Route pour la connexion d'un utilisateur
POST /api/users/login

exemple de requête:

{
"email": "test@gmail.com",
"password" : "password"
}

// Route pour récupérer le profil de l'utilisateur connecté (il faut d'abord se connecter avec /api/users/login pour obtenir un token et mettre " Bearer <token obtenu> " dans le header "Authorization")
GET /api/users/me

// Route pour récuperer tous les utilisateurs
GET /api/users/

// Route pour récuperer un utilisateur par son id
GET /api/users/iduser

// Route pour mettre à jour un utilisateur
PUT /api/users/iduser

exemple de requête:

{
"firstname": "test2",
"lastname": "test2",
"email": "test2@gmail.com",
}

// Route pour supprimer un utilisateur
DELETE /api/users/iduser

Routes Coloc :

// Route pour enregistrer une colocation (il faut d'abord se connecter avec /api/users/login pour obtenir un token et mettre " Bearer <token obtenu> " dans le header "Authorization". Le créateur de la coloc devient automatiquement son propriétaire)
POST /api/colocs/register

exemple de requête:

{
"proprietaire": "test",
"admin_coloc": "exempe",
"addresse": "1 rue de l'exemple",
"surface": 80,
"nb_de_piece": 2,
"loyer": 500
}

// Route pour supprimer une colocation
DELETE /api/colocs/idcoloc

// Route pour ajouter un membre à une colocation (il faut d'abord se connecter avec /api/users/login pour obtenir un token et mettre " Bearer <token obtenu> " dans le header "Authorization")
POST /api/colocs/idcoloc/add-member

exemple de requête:

{
"userId": 1
}

// Route pour supprimer un membre d'une colocation (il faut d'abord se connecter avec /api/users/login pour obtenir un token et mettre " Bearer <token obtenu> " dans le header "Authorization")
POST /api/colocs/idcoloc/remove-member

exemple de requête:

{
"userId": 1
}

// Route pour changer le propriétaire d'une colocation (il faut d'abord se connecter avec /api/users/login sur le compte de l'utilisateur proprietaire de la coloc pour obtenir un token et mettre " Bearer <token obtenu> " dans le header "Authorization")
POST /api/colocs/idcoloc/transfer-ownership

exemple de requête:

{
"newOwnerId": 1
}

// Route pour récupérer les membres d'une colocation
GET /api/colocs/idcoloc/

Routes Finances :

// Route pour ajouter un frais (il faut d'abord se connecter avec /api/users/login pour obtenir un token et mettre " Bearer <token obtenu> " dans le header "Authorization")
POST /api/finances/colocId/add-charge

exemple de requête:

{
"type": "rent",
"montant": 500,
"date": "2023-10-01"
}

// Route pour supprimer un frais (il faut d'abord se connecter avec /api/users/login pour obtenir un token et mettre " Bearer <token obtenu> " dans le header "Authorization")
DELETE /api/finances/financeid/remove-charge

// Route pour rembourser un membre (il faut d'abord se connecter avec /api/users/login pour obtenir un token et mettre " Bearer <token obtenu> " dans le header "Authorization")
POST /api/finances/financeid/pay-member

exemple de requête:

{
"montant": 500
}
