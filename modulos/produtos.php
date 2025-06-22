<div class="pagina-produtos-flex">
    <div class="produtos-barra-superior">
        <h2>Produtos</h2>
        <button id="btnNovoProduto" class="btn btn-primary">+ Novo Produto</button>
        <div class="produtos-filtros">
            <input type="text" id="buscaProduto" placeholder="Buscar por nome, categoria ou código" autocomplete="off">
            <select id="filtroCategoriaProduto">
                <option value="">Todas Categorias</option>
                <!-- Opções dinâmicas de categoria -->
            </select>
            <select id="filtroUnidadeProduto">
                <option value="">Todas Unidades</option>
                <!-- Opções dinâmicas de unidade -->
            </select>
        </div>
    </div>
    <div class="produtos-lista">
        <table>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Produto</th>
                    <th>Categoria</th>
                    <th>Unidade</th>
                    <th>Estoque</th>
                    <th>Preço (R$)</th>
                    <th>Status</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody id="tabelaProdutos">
                <tr>
                    <td colspan="8" style="text-align:center; color:#999;">Nenhum produto encontrado.</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
