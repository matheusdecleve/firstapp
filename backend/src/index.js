//Requer um pacote - não precisa do ./
const express = require('express');
//Requer o cors (Acesso a aplicação somente se estiver no dominio de origem)
const cors = require('cors');
//Requer um arquivo - então precisa do ./
const routes = require('./routes');


const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);