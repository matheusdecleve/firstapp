const connection = require('../database/connection');

module.exports = {
  //Lista casos específicos de uma unica ong (a que está logada)
  async index(request, response){
    const ong_id = request.headers.authorization;

    const casos = await connection('casos')
      .where('ong_id', ong_id)
      .select('*');

    return response.json({ casos })
  }
}