
<div class="pagina-clientes-flex">
    <div class="clientes-barra-superior">
        <h2>Clientes</h2>
        <button id="btnNovoCliente" class="btn btn-primary">+ Novo Cliente</button>
        <div class="clientes-filtros">
            <input type="text" id="buscaCliente" placeholder="Buscar cliente por nome, telefone ou email" autocomplete="off">
            <select id="filtroStatusCliente">
                <option value="">Todos</option>
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
            </select>
        </div>
    </div>
    <div class="clientes-lista">
        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Telefone</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody id="tabelaClientes">
                <tr>
                    <td colspan="5" style="text-align:center; color:#999;">Nenhum cliente encontrado.</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

