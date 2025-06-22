<?php
session_start();
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>ERPSAAS</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- FullCalendar CSS -->

    <!-- CSS principal do sistema -->
    <link href="assets/css/style.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css" rel="stylesheet">
</head>
<body>
    <?php include 'includes/topo.php'; ?>
    <?php include 'includes/menu_lateral.php'; ?>
    <main id="conteudoPrincipal">
        <div class="layout-flex-principal">
            <!-- Coluna Lateral Esquerda -->
            <aside class="coluna-lateral-interna">
                <?php include 'includes/mini_calendario.php'; ?>
                <?php include 'includes/filaespera.php'; ?>
                <?php include 'includes/listar_profissionais.php'; ?>
            </aside>
            <!-- FullCalendar principal (ou conteúdo SPA se trocar módulo) -->
            <section class="conteudo-principal">
                <div id="fullcalendar"></div>
            </section>
        </div>
        <div id="areaConteudo" style="display:none"></div>
    </main>
    <?php include 'includes/modais.php'; ?>
    <script src="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.17/index.global.min.js"></script>
    <script src="assets/js/fullcalendar.js"></script>
    <script src="assets/js/script.js"></script>
</body>

</html>
