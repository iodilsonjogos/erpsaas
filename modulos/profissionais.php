<div class="pagina-profissionais-flex">
    <div class="profissionais-barra-superior">
        <h2>Profissionais</h2>
        <button id="btnNovoProfissional" class="btn btn-primary">+ Novo Profissional</button>
        <div class="profissionais-filtros">
            <input type="text" id="buscaProfissional" placeholder="Buscar por nome, documento ou especialidade" autocomplete="off">
            <select id="filtroEspecialidadeProfissional">
                <option value="">Todas Especialidades</option>
                <!-- Preencher com as opções dinâmicas do seu banco -->
            </select>
        </div>
    </div>
    <!-- Lista dos profissionais do dia (resumida), pode ser um include se for global -->
    <div id="profissionaisDoDia">
        <?php include __DIR__ . '/../includes/profissionais_dia.php'; ?>
    </div>
    <!-- Lista completa de profissionais -->
    <div class="profissionais-lista">
        <table>
            <thead>
                <tr>
                    <th>Foto</th>
                    <th>Nome</th>
                    <th>Especialidade</th>
                    <th>Telefone</th>
                    <th>Status</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody id="tabelaProfissionais">
                <tr>
                    <td colspan="6" style="text-align:center; color:#999;">Nenhum profissional encontrado.</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
