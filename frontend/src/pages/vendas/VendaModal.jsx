
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function VendaModal({ data, onClose, onSave }) {
  const [form, setForm] = useState(data || {
    cliente_id: '', valor_total: '', status: 'aberta', observacoes: '', itens: []
  });

  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      const [clientesRes, produtosRes] = await Promise.all([
        axios.get(process.env.REACT_APP_API_URL + '/clientes', { headers }),
        axios.get(process.env.REACT_APP_API_URL + '/produtos', { headers })
      ]);
      setClientes(clientesRes.data);
      setProdutos(produtosRes.data);
    }
    fetchData();
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleItemChange = (idx, field, value) => {
    const newItens = [...form.itens];
    newItens[idx][field] = value;
    setForm({ ...form, itens: newItens });
  };

  const addItem = () => {
    setForm({ ...form, itens: [...form.itens, { produto_id: '', quantidade: 1, preco_unitario: 0 }] });
  };

  const removeItem = idx => {
    const newItens = [...form.itens];
    newItens.splice(idx, 1);
    setForm({ ...form, itens: newItens });
  };

  // Atualiza o valor_total automaticamente
  useEffect(() => {
    const valor_total = form.itens.reduce((acc, item) =>
      acc + (parseFloat(item.quantidade || 0) * parseFloat(item.preco_unitario || 0)), 0);
    setForm(f => ({ ...f, valor_total: valor_total.toFixed(2) }));
    // eslint-disable-next-line
  }, [form.itens]);

  const handleSubmit = e => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form className="bg-white rounded-2xl p-6 shadow-xl min-w-[400px]" onSubmit={handleSubmit}>
        <h3 className="font-bold text-lg mb-4">{form.id ? "Editar" : "Nova"} Venda</h3>
        <div className="mb-2">
          <label>Cliente</label>
          <select name="cliente_id" className="input input-bordered w-full" value={form.cliente_id} onChange={handleChange} required>
            <option value="">Selecione</option>
            {clientes.map(c => (
              <option key={c.id} value={c.id}>{c.nome}</option>
            ))}
          </select>
        </div>

        <div className="mb-2">
          <label>Produtos da Venda</label>
          <button type="button" className="btn btn-sm btn-outline ml-2" onClick={addItem}>Adicionar Produto</button>
          {form.itens.map((item, idx) => (
            <div key={idx} className="flex gap-2 mt-2">
              <select
                className="input input-bordered"
                value={item.produto_id}
                onChange={e => handleItemChange(idx, 'produto_id', e.target.value)}
                required
              >
                <option value="">Produto</option>
                {produtos.map(p => (
                  <option key={p.id} value={p.id}>{p.nome}</option>
                ))}
              </select>
              <input
                type="number"
                min="1"
                placeholder="Qtd"
                className="input input-bordered w-16"
                value={item.quantidade}
                onChange={e => handleItemChange(idx, 'quantidade', e.target.value)}
                required
              />
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="Preço"
                className="input input-bordered w-24"
                value={item.preco_unitario}
                onChange={e => handleItemChange(idx, 'preco_unitario', e.target.value)}
                required
              />
              <button type="button" className="btn btn-sm btn-danger" onClick={() => removeItem(idx)}>x</button>
            </div>
          ))}
        </div>
        <div className="mb-2">
          <label>Valor Total</label>
          <input type="number" name="valor_total" step="0.01" className="input input-bordered w-full" value={form.valor_total} readOnly />
        </div>
        <div className="mb-2">
          <label>Status</label>
          <select name="status" className="input input-bordered w-full" value={form.status} onChange={handleChange}>
            <option value="aberta">Aberta</option>
            <option value="fechada">Fechada</option>
            <option value="cancelada">Cancelada</option>
          </select>
        </div>
        <div className="mb-2">
          <label>Observações</label>
          <input type="text" name="observacoes" className="input input-bordered w-full" value={form.observacoes} onChange={handleChange} />
        </div>
        <div className="flex gap-2 mt-4">
          <button type="submit" className="btn btn-primary">Salvar</button>
          <button type="button" className="btn btn-outline" onClick={onClose}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}