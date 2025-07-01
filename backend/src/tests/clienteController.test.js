const request = require('supertest');
const app = require('../server'); // Ajuste o caminho se necessário

describe('Cliente API', () => {
  it('deve retornar status 401 sem token', async () => {
    const res = await request(app).get('/api/clientes');
    expect(res.statusCode).toBe(401);
  });

  // Adicione mais testes conforme autenticação e mock de banco
});
