import React, { useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL + '/relatorios/vendas';

export default function RelatorioVendasPage() {
  const [inicio, setInicio] = useState('');
  const [fim, setFim] = useState('');
  const [dados, setDados] = useState([]);

  const buscar = async () => {
    if (!inicio || !fim) return alert('Selecione o período!');
    const token = localStorage.getItem('token');
    const { data } = await axios.get(apiUrl, {
      params: { inicio, fim },
      headers: { Authorization: `Bearer ${token}` }
    });
    setDados(data);
  };

  const exportar = (tipo) => {
    if (!inicio || !fim) return alert('Selecione o período!');
    const token = localStorage.getItem('token');
    const url = `${process.env.REACT_APP_API_URL}/relatorios/vendas/${tipo}?inicio=${inicio}&fim=${fim}`;
    window.open(url, '_blank');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="max-w-4xl mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4">Relatório de Vendas</h2>
          <div className="flex gap-4 mb-4">
            <div>
              <label>Início</label>
              <input type="date" value={inicio} onChange={e => setInicio(e.target.value)} className="input input-bordered" />
            </div>
            <div>
              <label>Fim</label>
              <input type="date" value={fim} onChange={e => setFim(e.target.value)} className="input input-bordered" />
            </div>
            <button className="btn btn-primary self-end" onClick={buscar}>Buscar</button>
            <button className="btn btn-outline self-end" onClick={() => exportar('excel')}>Exportar Excel</button>
            <button className="btn btn-outline self-end" onClick={() => exportar('pdf')}>Exportar PDF</button>
          </div>
          <table className="min-w-full bg-white rounded-xl shadow">
            <thead>
              <tr>
                <th className="p-2">ID</th>
                <th className="p-2">Cliente</th>
                <th className="p-2">Valor Total</th>
                <th className="p-2">Status</th>
                <th className="p-2">Data</th>
              </tr>
            </thead>
            <tbody>
              {dados.map((v) => (
                <tr key={v.id}>
                  <td className="p-2">{v.id}</td>
                  <td className="p-2">{v.cliente_nome}</td>
                  <td className="p-2">R$ {v.valor_total}</td>
                  <td className="p-2">{v.status}</td>
                  <td className="p-2">{v.data && v.data.split('T')[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
}
