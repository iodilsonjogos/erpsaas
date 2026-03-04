// src/controllers/vendaController.js
// Correções principais:
// - multiempresa: sempre usa req.user.empresa_id (ignora empresa_id do body)
// - transação ao criar venda + itens
// - validação básica de entrada

const db = require("../config/db");

function isPositiveNumber(n) {
  const x = Number(n);
  return Number.isFinite(x) && x > 0;
}

exports.listar = async (req, res) => {
  try {
    const empresa_id = req.user.empresa_id;
    const [rows] = await db.query(
      `SELECT v.*,
              c.nome AS cliente_nome
         FROM vendas v
         JOIN clientes c ON c.id = v.cliente_id AND c.empresa_id = v.empresa_id
        WHERE v.empresa_id = ?
        ORDER BY v.id DESC`,
      [empresa_id],
    );
    res.json(rows);
  } catch (err) {
    console.error("venda.listar:", err);
    res.status(500).json({ error: "Erro ao listar vendas." });
  }
};

exports.criar = async (req, res) => {
  const empresa_id = req.user.empresa_id;
  const { cliente_id, data_venda, itens } = req.body || {};

  if (!cliente_id)
    return res.status(400).json({ error: "cliente_id é obrigatório." });
  if (!Array.isArray(itens) || itens.length === 0) {
    return res
      .status(400)
      .json({ error: "itens é obrigatório (array não vazio)." });
  }

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    // valida cliente da empresa
    const [cRows] = await conn.query(
      "SELECT id FROM clientes WHERE id = ? AND empresa_id = ? LIMIT 1",
      [cliente_id, empresa_id],
    );
    if (cRows.length === 0) {
      await conn.rollback();
      return res
        .status(400)
        .json({ error: "cliente_id inválido para esta empresa." });
    }

    // Valida e calcula total
    let total = 0;
    for (const [idx, it] of itens.entries()) {
      const { produto_id, quantidade, preco_unitario } = it || {};
      if (!produto_id) {
        await conn.rollback();
        return res
          .status(400)
          .json({ error: `itens[${idx}].produto_id é obrigatório.` });
      }
      if (!isPositiveNumber(quantidade)) {
        await conn.rollback();
        return res
          .status(400)
          .json({ error: `itens[${idx}].quantidade deve ser > 0.` });
      }

      // preço: se não vier, pega do produto
      let preco = Number(preco_unitario);
      if (!Number.isFinite(preco) || preco <= 0) {
        const [pRows] = await conn.query(
          "SELECT preco FROM produtos WHERE id = ? AND empresa_id = ? LIMIT 1",
          [produto_id, empresa_id],
        );
        if (pRows.length === 0) {
          await conn.rollback();
          return res
            .status(400)
            .json({
              error: `itens[${idx}].produto_id inválido para esta empresa.`,
            });
        }
        preco = Number(pRows[0].preco);
      } else {
        // se veio no body, ainda valida que o produto é da empresa
        const [pRows] = await conn.query(
          "SELECT id FROM produtos WHERE id = ? AND empresa_id = ? LIMIT 1",
          [produto_id, empresa_id],
        );
        if (pRows.length === 0) {
          await conn.rollback();
          return res
            .status(400)
            .json({
              error: `itens[${idx}].produto_id inválido para esta empresa.`,
            });
        }
      }

      total += preco * Number(quantidade);
      it.__preco_final = preco;
    }

    const [vendaResult] = await conn.query(
      "INSERT INTO vendas (cliente_id, empresa_id, total, data_venda) VALUES (?, ?, ?, ?)",
      [cliente_id, empresa_id, total, data_venda || new Date()],
    );

    const venda_id = vendaResult.insertId;

    for (const it of itens) {
      await conn.query(
        "INSERT INTO venda_itens (venda_id, produto_id, quantidade, preco_unitario) VALUES (?, ?, ?, ?)",
        [venda_id, it.produto_id, it.quantidade, it.__preco_final],
      );
    }

    await conn.commit();
    res
      .status(201)
      .json({ message: "Venda criada com sucesso", id: venda_id, total });
  } catch (err) {
    try {
      await conn.rollback();
    } catch (_) {}
    console.error("venda.criar:", err);
    res.status(500).json({ error: "Erro ao criar venda." });
  } finally {
    conn.release();
  }
};

exports.atualizar = async (req, res) => {
  try {
    const empresa_id = req.user.empresa_id;
    const { id } = req.params;
    const { cliente_id, total, data_venda } = req.body || {};

    const [result] = await db.query(
      `UPDATE vendas
          SET cliente_id = COALESCE(?, cliente_id),
              total      = COALESCE(?, total),
              data_venda  = COALESCE(?, data_venda)
        WHERE id = ? AND empresa_id = ?`,
      [cliente_id ?? null, total ?? null, data_venda ?? null, id, empresa_id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Venda não encontrada." });
    }
    res.json({ message: "Venda atualizada com sucesso" });
  } catch (err) {
    console.error("venda.atualizar:", err);
    res.status(500).json({ error: "Erro ao atualizar venda." });
  }
};

exports.deletar = async (req, res) => {
  const empresa_id = req.user.empresa_id;
  const { id } = req.params;
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const [vRows] = await conn.query(
      "SELECT id FROM vendas WHERE id = ? AND empresa_id = ? LIMIT 1",
      [id, empresa_id],
    );
    if (vRows.length === 0) {
      await conn.rollback();
      return res.status(404).json({ error: "Venda não encontrada." });
    }

    await conn.query("DELETE FROM venda_itens WHERE venda_id = ?", [id]);
    await conn.query("DELETE FROM vendas WHERE id = ? AND empresa_id = ?", [
      id,
      empresa_id,
    ]);
    await conn.commit();
    res.json({ message: "Venda removida com sucesso" });
  } catch (err) {
    try {
      await conn.rollback();
    } catch (_) {}
    console.error("venda.deletar:", err);
    res.status(500).json({ error: "Erro ao remover venda." });
  } finally {
    conn.release();
  }
};
