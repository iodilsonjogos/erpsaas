<?php
// Exemplo: no início do topo.php
include __DIR__ . '/../includes/conexao.php';
$empresa_nome = 'Minha Empresa'; // valor padrão
$res = $conn->query("SELECT nome FROM empresa LIMIT 1");
if ($res && $row = $res->fetch_assoc()) {
    $empresa_nome = $row['nome'];
}
?>
<header class="topo-sistema">
    <div class="topo-nome-empresa"><?= htmlspecialchars($empresa_nome) ?></div>
    <!-- Botão de menu lateral -->
    <button id="toggle-menu" class="btn-topo menu-toggle">
        <i class="ri-menu-line"></i>
    </button>
    <!-- Atalhos/Ações rápidas -->
    <nav class="topo-atalhos">
        <button class="btn-topo atalho" id="atalho-nova-venda" title="Nova Venda">
            <i class="ri-add-line"></i><i class="ri-shopping-cart-2-line"></i>
        </button>
        <button class="btn-topo atalho" id="atalho-novo-agendamento" title="Novo Agendamento">
            <i class="ri-add-line"></i><i class="ri-calendar-2-line"></i>
        </button>
        <button class="btn-topo atalho" id="atalho-relatorios" title="Relatórios">
            <i class="ri-bar-chart-2-line"></i>
        </button>
        <!-- Outros atalhos se quiser -->
    </nav>
    <div class="topo-espacador"></div>
    <!-- Notificações -->
    <div class="topo-notificacoes" id="notificacoes">
        <button class="btn-topo notificacao" id="btnNotificacoes" title="Notificações">
            <i class="ri-notification-3-line"></i>
            <span class="notificacao-badge" id="badgeNotificacoes">3</span>
        </button>
        <div class="notificacoes-popup" id="popupNotificacoes" style="display:none;">
            <ul>
                <li>Pagamento confirmado.</li>
                <li>Nova mensagem do cliente.</li>
                <li>Backup realizado com sucesso.</li>
            </ul>
        </div>
    </div>
    <!-- Menu do usuário logado -->
    <div class="topo-usuario" id="menuUsuario">
        <img src="assets/img/avatar_usuario.png" alt="Avatar" class="avatar-usuario">
        <span class="nome-usuario">Admin</span>
        <button class="btn-topo usuario-dropdown" id="btnMenuUsuario">
            <i class="ri-arrow-down-s-line"></i>
        </button>
        <div class="usuario-menu-popup" id="popupUsuario" style="display:none;">
            <ul>
                <li><a href="perfil.php"><i class="ri-user-3-line"></i> Meu Perfil</a></li>
                <li><a href="configuracoes.php"><i class="ri-settings-3-line"></i> Configurações</a></li>
                <li><a href="logout.php"><i class="ri-logout-box-line"></i> Sair</a></li>
            </ul>
        </div>
    </div>
</header>
