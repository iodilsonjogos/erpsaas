const db = require('../config/db');

module.exports = {
  async getById(id) {
    const [rows] = await db.query('SELECT * FROM empresas WHERE id = ?', [id]);
    return rows[0];
  },
  async atualizar(id, data) {
    await db.query(
      `UPDATE empresas SET nome=?, cnpj=?, endereco=?, telefone=?, email=?, logo=?, plano_id=?
       WHERE id=?`,
      [
        data.nome, data.cnpj, data.endereco, data.telefone,
        data.email, data.logo, data.plano_id, id
      ]
    );
  },
};
