// src/controllers/homeController.js
// Home (dashboard/agenda geral/lista de espera) — versão corrigida para mysql2/promise

const db = require("../config/db");

// Cache simples para evitar bater no INFORMATION_SCHEMA a cada request
const _colCache = new Map();
async function hasColumn(table, column) {
  const key = `${table}.${column}`;
  if (_colCache.has(key)) return _colCache.get(key);

  const [rows] = await db.query(
    `SELECT 1 as ok
       FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = ?
        AND COLUMN_NAME = ?
      LIMIT 1`,
    [table, column],
  );

  const ok = rows.length > 0;
  _colCache.set(key, ok);
  return ok;
}

function parseISODateOrNull(v) {
  if (!v) return null;
  const m = String(v).match(/^\d{4}-\d{2}-\d{2}$/);
  return m ? v : null;
}

// GET /api/home/profissionais-hoje
exports.getProfissionaisHoje = async (req, res) => {
  try {
    const empresa_id = req.user.empresa_id;

    const [rows] = await db.query(
      `SELECT p.id,
              p.nome,
              p.especialidade,
              COUNT(a.id) AS total_agendamentos
         FROM profissionais p
         LEFT JOIN agenda a
           ON a.profissional_id = p.id
          AND a.empresa_id = p.empresa_id
          AND a.data = CURDATE()
        WHERE p.empresa_id = ?
        GROUP BY p.id, p.nome, p.especialidade
        ORDER BY total_agendamentos DESC, p.nome ASC`,
      [empresa_id],
    );

    res.json(rows);
  } catch (err) {
    console.error("getProfissionaisHoje:", err);
    res.status(500).json({ error: "Erro ao buscar profissionais do dia." });
  }
};

// GET /api/home/agendamentos-dia?data=YYYY-MM-DD
exports.getAgendamentosDia = async (req, res) => {
  try {
    const empresa_id = req.user.empresa_id;
    const data = parseISODateOrNull(req.query.data) || null;

    const whereDate = data ? "a.data = ?" : "a.data = CURDATE()";
    const params = data ? [empresa_id, data] : [empresa_id];

    const [rows] = await db.query(
      `SELECT a.id,
              a.data,
              a.hora,
              a.status,
              a.observacoes,
              c.id AS cliente_id,
              c.nome AS cliente_nome,
              c.telefone AS cliente_telefone,
              p.id AS profissional_id,
              p.nome AS profissional_nome,
              s.id AS servico_id,
              s.nome AS servico_nome,
              s.preco AS servico_preco
         FROM agenda a
         JOIN clientes c        ON c.id = a.cliente_id AND c.empresa_id = a.empresa_id
         JOIN profissionais p   ON p.id = a.profissional_id AND p.empresa_id = a.empresa_id
         JOIN servicos s        ON s.id = a.servico_id AND s.empresa_id = a.empresa_id
        WHERE a.empresa_id = ?
          AND ${whereDate}
        ORDER BY a.data ASC, a.hora ASC`,
      params,
    );

    res.json(rows);
  } catch (err) {
    console.error("getAgendamentosDia:", err);
    res.status(500).json({ error: "Erro ao buscar agendamentos do dia." });
  }
};

// GET /api/home/mini-calendario?ano=2026&mes=2
exports.getMiniCalendario = async (req, res) => {
  try {
    const empresa_id = req.user.empresa_id;
    const ano = Number(req.query.ano) || null;
    const mes = Number(req.query.mes) || null; // 1-12

    const [base] = await db.query(
      "SELECT YEAR(CURDATE()) AS ano, MONTH(CURDATE()) AS mes",
    );
    const y = ano || base[0].ano;
    const m = mes || base[0].mes;

    const [rows] = await db.query(
      `SELECT a.data AS dia,
              COUNT(a.id) AS total
         FROM agenda a
        WHERE a.empresa_id = ?
          AND YEAR(a.data) = ?
          AND MONTH(a.data) = ?
        GROUP BY a.data
        ORDER BY a.data ASC`,
      [empresa_id, y, m],
    );

    res.json({ ano: y, mes: m, dias: rows });
  } catch (err) {
    console.error("getMiniCalendario:", err);
    res.status(500).json({ error: "Erro ao buscar mini calendário." });
  }
};

// -------- LISTA DE ESPERA --------
// resiliente: com/sem empresa_id na tabela lista_espera

// GET /api/home/lista-espera
exports.getListaEspera = async (req, res) => {
  try {
    const empresa_id = req.user.empresa_id;
    const hasEmpresaId = await hasColumn("lista_espera", "empresa_id");

    const [rows] = await db.query(
      `SELECT le.*,
              p.nome AS profissional_nome,
              s.nome AS servico_nome
         FROM lista_espera le
         LEFT JOIN profissionais p ON p.id = le.profissional_id${hasEmpresaId ? " AND p.empresa_id = le.empresa_id" : ""}
         LEFT JOIN servicos s      ON s.id = le.servico_id${hasEmpresaId ? " AND s.empresa_id = le.empresa_id" : ""}
        ${hasEmpresaId ? "WHERE le.empresa_id = ?" : ""}
        ORDER BY le.data_entrada DESC, le.id DESC`,
      hasEmpresaId ? [empresa_id] : [],
    );

    res.json(rows);
  } catch (err) {
    console.error("getListaEspera:", err);
    res.status(500).json({ error: "Erro ao listar lista de espera." });
  }
};

// POST /api/home/lista-espera
exports.addListaEspera = async (req, res) => {
  try {
    const empresa_id = req.user.empresa_id;
    const {
      nome_cliente,
      telefone,
      servico_id,
      profissional_id,
      data_entrada,
      observacao,
    } = req.body || {};

    if (!nome_cliente || !String(nome_cliente).trim()) {
      return res.status(400).json({ error: "nome_cliente é obrigatório." });
    }
    if (!telefone || !String(telefone).trim()) {
      return res.status(400).json({ error: "telefone é obrigatório." });
    }

    const hasEmpresaId = await hasColumn("lista_espera", "empresa_id");
    const cols = [];
    const vals = [];
    const params = [];

    if (hasEmpresaId) {
      cols.push("empresa_id");
      vals.push("?");
      params.push(empresa_id);
    }

    cols.push("nome_cliente", "telefone");
    vals.push("?", "?");
    params.push(String(nome_cliente).trim(), String(telefone).trim());

    if (servico_id != null) {
      cols.push("servico_id");
      vals.push("?");
      params.push(servico_id);
    }
    if (profissional_id != null) {
      cols.push("profissional_id");
      vals.push("?");
      params.push(profissional_id);
    }
    if (data_entrada) {
      cols.push("data_entrada");
      vals.push("?");
      params.push(data_entrada);
    }
    if (observacao) {
      cols.push("observacao");
      vals.push("?");
      params.push(String(observacao));
    }

    const sql = `INSERT INTO lista_espera (${cols.join(",")}) VALUES (${vals.join(",")})`;
    const [result] = await db.query(sql, params);

    res
      .status(201)
      .json({ message: "Adicionado à lista de espera.", id: result.insertId });
  } catch (err) {
    console.error("addListaEspera:", err);
    res.status(500).json({ error: "Erro ao adicionar na lista de espera." });
  }
};

// PATCH /api/home/lista-espera/:id/status
exports.updateStatusListaEspera = async (req, res) => {
  try {
    const empresa_id = req.user.empresa_id;
    const id = req.params.id;
    const { status } = req.body || {};

    if (!status || !String(status).trim()) {
      return res.status(400).json({ error: "status é obrigatório." });
    }

    const hasEmpresaId = await hasColumn("lista_espera", "empresa_id");
    const [result] = await db.query(
      `UPDATE lista_espera
          SET status = ?
        WHERE id = ?${hasEmpresaId ? " AND empresa_id = ?" : ""}`,
      hasEmpresaId
        ? [String(status).trim(), id, empresa_id]
        : [String(status).trim(), id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Registro não encontrado." });
    }
    res.json({ message: "Status atualizado." });
  } catch (err) {
    console.error("updateStatusListaEspera:", err);
    res.status(500).json({ error: "Erro ao atualizar status." });
  }
};

// DELETE /api/home/lista-espera/:id
exports.deleteListaEspera = async (req, res) => {
  try {
    const empresa_id = req.user.empresa_id;
    const id = req.params.id;
    const hasEmpresaId = await hasColumn("lista_espera", "empresa_id");

    const [result] = await db.query(
      `DELETE FROM lista_espera WHERE id = ?${hasEmpresaId ? " AND empresa_id = ?" : ""}`,
      hasEmpresaId ? [id, empresa_id] : [id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Registro não encontrado." });
    }
    res.json({ message: "Removido da lista de espera." });
  } catch (err) {
    console.error("deleteListaEspera:", err);
    res.status(500).json({ error: "Erro ao remover da lista de espera." });
  }
};
