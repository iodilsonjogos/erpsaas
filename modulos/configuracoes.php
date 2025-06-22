<div class="pagina-configuracoes-flex">
    <!-- Barra superior -->
    <div class="configuracoes-barra-superior">
        <h2>Configurações</h2>
        <div class="configuracoes-abas">
            <button class="aba-config ativo" data-aba="empresa">Empresa</button>
            <button class="aba-config" data-aba="usuario">Usuário</button>
            <button class="aba-config" data-aba="tema">Tema/Aparência</button>
            <button class="aba-config" data-aba="permissoes">Permissões</button>
            <button class="aba-config" data-aba="preferencias">Preferências</button>
        </div>
    </div>

    <!-- Conteúdo das abas (um exemplo de cada, pode esconder/mostrar via JS) -->
    <div class="configuracoes-bloco-conteudo">
        <!-- Aba Empresa -->
        <div class="bloco-config-aba" id="aba-empresa" style="display:block">
            <h3>Dados da Empresa</h3>
            <form id="formConfigEmpresa" autocomplete="off">
                <div class="form-row">
                    <div class="form-group">
                        <label for="empresaNome">Nome da empresa</label>
                        <input type="text" id="empresaNome" name="empresaNome" required>
                    </div>
                    <div class="form-group">
                        <label for="empresaCNPJ">CNPJ</label>
                        <input type="text" id="empresaCNPJ" name="empresaCNPJ" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="empresaEmail">E-mail</label>
                        <input type="email" id="empresaEmail" name="empresaEmail">
                    </div>
                    <div class="form-group">
                        <label for="empresaTelefone">Telefone</label>
                        <input type="tel" id="empresaTelefone" name="empresaTelefone">
                    </div>
                </div>
                <div class="form-group">
                    <label for="empresaEndereco">Endereço</label>
                    <input type="text" id="empresaEndereco" name="empresaEndereco">
                </div>
                <button type="submit" class="btn btn-primary">Salvar</button>
            </form>
        </div>

        <!-- Aba Usuário -->
        <div class="bloco-config-aba" id="aba-usuario" style="display:none">
            <h3>Dados do Usuário</h3>
            <form id="formConfigUsuario" autocomplete="off">
                <div class="form-row">
                    <div class="form-group">
                        <label for="usuarioNome">Nome</label>
                        <input type="text" id="usuarioNome" name="usuarioNome" required>
                    </div>
                    <div class="form-group">
                        <label for="usuarioEmail">E-mail</label>
                        <input type="email" id="usuarioEmail" name="usuarioEmail" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="usuarioSenhaAtual">Senha atual</label>
                        <input type="password" id="usuarioSenhaAtual" name="usuarioSenhaAtual">
                    </div>
                    <div class="form-group">
                        <label for="usuarioNovaSenha">Nova senha</label>
                        <input type="password" id="usuarioNovaSenha" name="usuarioNovaSenha">
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">Atualizar</button>
            </form>
        </div>

        <!-- Aba Tema/Aparência -->
        <div class="bloco-config-aba" id="aba-tema" style="display:none">
            <h3>Tema e Aparência</h3>
            <form id="formConfigTema">
                <div class="form-group">
                    <label>Tema do sistema:</label>
                    <select id="temaSistema" name="temaSistema">
                        <option value="claro">Claro</option>
                        <option value="escuro">Escuro</option>
                        <option value="automatico">Automático</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Salvar</button>
            </form>
        </div>

        <!-- Aba Permissões -->
        <div class="bloco-config-aba" id="aba-permissoes" style="display:none">
            <h3>Permissões e Controle de Acesso</h3>
            <p>(Aqui você poderá gerenciar grupos, permissões de acesso por módulo, etc.)</p>
            <!-- Adapte conforme a regra de negócio e o banco de dados -->
        </div>

        <!-- Aba Preferências -->
        <div class="bloco-config-aba" id="aba-preferencias" style="display:none">
            <h3>Preferências Gerais</h3>
            <form id="formConfigPreferencias">
                <div class="form-group">
                    <label for="preferenciaNotificacoes">
                        <input type="checkbox" id="preferenciaNotificacoes" name="preferenciaNotificacoes">
                        Receber notificações por e-mail
                    </label>
                </div>
                <div class="form-group">
                    <label for="preferenciaIdioma">Idioma do sistema:</label>
                    <select id="preferenciaIdioma" name="preferenciaIdioma">
                        <option value="pt-BR">Português</option>
                        <option value="en-US">Inglês</option>
                        <!-- Outros idiomas -->
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Salvar</button>
            </form>
        </div>
    </div>
</div>
