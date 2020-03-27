const express = require('express');

const ongController = require('./controllers/ongController');
const casoController = require('./controllers/casoController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');

const routes = express.Router();

routes.post('/sessions', sessionController.create)

//Rota para as ongs
routes.get('/ongs', ongController.index);
routes.post('/ongs', ongController.create);

//Rota para profile
routes.get('/profile', profileController.index);

//Rota para os casos
routes.get('/casos', casoController.index);
routes.post('/casos', casoController.create);
routes.delete('/casos/:id', casoController.delete);

module.exports = routes;