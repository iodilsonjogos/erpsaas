import axios from "axios";
/*const api = process.env.REACT_APP_API_URL;*/
import api from '../../services/api';

// Token JWT
const getAuth = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Profissionais ativos
export const getProfissionaisAtivos = async () => {
  const response = await api.get(`/home/profissionais`, getAuth());
  return response.data;
};

// Agendamentos do dia
export const getAgendamentosDia = async (dataAgendada) => {
  const response = await api.get(`/home/agendamentos-dia`, {
    ...getAuth(),
    params: { data: dataAgendada },
  });
  return response.data;
};

// Datas especiais
export const getDatasEspeciais = async () => {
  const response = await api.get(`/home/datas-especiais`, getAuth());
  return response.data;
};


// Buscar a lista de espera
export const getListaEspera = async () => {
  const response = await api.get('/home/lista-espera');
  return response.data;
};

// Adicionar um novo cliente na lista de espera
export const adicionarListaEspera = async (dados) => {
  const response = await api.post('/home/lista-espera', dados);
  return response.data;
};

// Confirmar um cliente como atendido
export const confirmarListaEspera = async (id) => {
  const response = await api.put(`/home/lista-espera/${id}/confirmar`);
  return response.data;
};

// Excluir um cliente da lista de espera
export const excluirListaEspera = async (id) => {
  const response = await api.delete(`/home/lista-espera/${id}`);
  return response.data;
};