const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
  //Lista as ongs
  async index(request, response){
    const ongs = await connection('ongs').select('*');
  
    return response.json(ongs);
  },

  //Cadastra uma ong
  async create(request, response){
    const { name, email, whatsapp, city, uf } = request.body;

    const id = crypto.randomBytes(4).toString('HEX');

    //Insere no banco de dados na tabela ong
    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    })
    
    //Retorna o ID para o usuario
    return response.json({ id });
  }
}