-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 30/07/2025 às 22:33
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `erpsaas`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `agenda`
--

CREATE TABLE `agenda` (
  `id` int(11) NOT NULL,
  `empresa_id` int(11) NOT NULL,
  `cliente_id` int(11) DEFAULT NULL,
  `profissional_id` int(11) DEFAULT NULL,
  `servico_id` int(11) DEFAULT NULL,
  `data` date DEFAULT NULL,
  `hora` time DEFAULT NULL,
  `status` varchar(20) DEFAULT 'agendado',
  `observacoes` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `agenda`
--

INSERT INTO `agenda` (`id`, `empresa_id`, `cliente_id`, `profissional_id`, `servico_id`, `data`, `hora`, `status`, `observacoes`, `created_at`) VALUES
(1, 4, NULL, NULL, NULL, '2025-07-29', '15:45:00', 'confirmado', NULL, '2025-07-28 22:40:27');

-- --------------------------------------------------------

--
-- Estrutura para tabela `assinaturas`
--

CREATE TABLE `assinaturas` (
  `id` int(11) NOT NULL,
  `empresa_id` int(11) NOT NULL,
  `plano_id` int(11) DEFAULT NULL,
  `data_inicio` date DEFAULT NULL,
  `data_fim` date DEFAULT NULL,
  `status` varchar(20) DEFAULT 'ativo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `empresa_id` int(11) NOT NULL,
  `nome` varchar(120) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telefone` varchar(40) DEFAULT NULL,
  `data_nascimento` date DEFAULT NULL,
  `status` varchar(20) DEFAULT 'ativo',
  `observacoes` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `clientes`
--

INSERT INTO `clientes` (`id`, `empresa_id`, `nome`, `email`, `telefone`, `data_nascimento`, `status`, `observacoes`, `created_at`) VALUES
(5, 4, 'Miguel Filho', 'mf@gmail.com', '84985584565', NULL, 'ativo', NULL, '2025-07-28 22:29:19');

-- --------------------------------------------------------

--
-- Estrutura para tabela `empresas`
--

CREATE TABLE `empresas` (
  `id` int(11) NOT NULL,
  `nome` varchar(150) NOT NULL,
  `cnpj` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telefone` varchar(30) DEFAULT NULL,
  `endereco` varchar(200) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `plano_id` int(11) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'ativo',
  `confirmacao_agendamento` varchar(30) DEFAULT NULL,
  `permite_upsell` tinyint(4) DEFAULT 0,
  `confirmacao_baixa` varchar(30) DEFAULT NULL,
  `tipo_comissao` varchar(30) DEFAULT NULL,
  `valor_comissao` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `empresas`
--

INSERT INTO `empresas` (`id`, `nome`, `cnpj`, `email`, `telefone`, `endereco`, `logo`, `plano_id`, `status`, `confirmacao_agendamento`, `permite_upsell`, `confirmacao_baixa`, `tipo_comissao`, `valor_comissao`) VALUES
(4, 'Antologic', NULL, 'antologic@gmail.com', '84994753059', NULL, NULL, 1, 'ativo', NULL, 0, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `financeiro`
--

CREATE TABLE `financeiro` (
  `id` int(11) NOT NULL,
  `empresa_id` int(11) NOT NULL,
  `tipo` varchar(20) NOT NULL,
  `categoria` varchar(60) DEFAULT NULL,
  `valor` decimal(10,2) NOT NULL,
  `data` date NOT NULL,
  `observacao` varchar(255) DEFAULT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `observacoes` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `financeiro`
--

INSERT INTO `financeiro` (`id`, `empresa_id`, `tipo`, `categoria`, `valor`, `data`, `observacao`, `descricao`, `observacoes`, `created_at`) VALUES
(3, 4, 'Receita', 'cabelo', 49.90, '2025-07-29', NULL, NULL, NULL, '2025-07-28 23:15:23');

-- --------------------------------------------------------

--
-- Estrutura para tabela `logs`
--

CREATE TABLE `logs` (
  `id` int(11) NOT NULL,
  `empresa_id` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `acao` varchar(60) NOT NULL,
  `tabela` varchar(60) DEFAULT NULL,
  `registro_id` int(11) DEFAULT NULL,
  `data` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `onboarding_progresso`
--

CREATE TABLE `onboarding_progresso` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `empresa_id` int(11) NOT NULL,
  `passo` varchar(50) NOT NULL,
  `concluido` tinyint(4) DEFAULT 0,
  `atualizado_em` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `permissoes`
--

CREATE TABLE `permissoes` (
  `id` int(11) NOT NULL,
  `perfil` varchar(30) NOT NULL,
  `modulo` varchar(50) NOT NULL,
  `pode_visualizar` tinyint(4) DEFAULT 1,
  `pode_criar` tinyint(4) DEFAULT 0,
  `pode_editar` tinyint(4) DEFAULT 0,
  `pode_excluir` tinyint(4) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `permissoes`
--

INSERT INTO `permissoes` (`id`, `perfil`, `modulo`, `pode_visualizar`, `pode_criar`, `pode_editar`, `pode_excluir`) VALUES
(1, 'admin', 'usuarios', 1, 1, 1, 1),
(2, 'operador', 'usuarios', 1, 1, 0, 0),
(3, 'admin', 'clientes', 1, 1, 1, 1),
(4, 'operador', 'clientes', 1, 1, 1, 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `planos`
--

CREATE TABLE `planos` (
  `id` int(11) NOT NULL,
  `nome` varchar(60) NOT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `valor` decimal(10,2) DEFAULT 0.00,
  `usuarios` int(11) DEFAULT 1,
  `recursos` text DEFAULT NULL,
  `status` varchar(20) DEFAULT 'ativo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `planos`
--

INSERT INTO `planos` (`id`, `nome`, `descricao`, `valor`, `usuarios`, `recursos`, `status`) VALUES
(1, 'Free', 'Plano gratuito', 0.00, 1, 'Recursos básicos', 'ativo'),
(2, 'Pro', 'Plano profissional', 99.90, 5, 'Recursos completos', 'ativo'),
(3, 'Enterprise', 'Grande porte', 249.90, 20, 'Recursos avançados', 'ativo');

-- --------------------------------------------------------

--
-- Estrutura para tabela `produtos`
--

CREATE TABLE `produtos` (
  `id` int(11) NOT NULL,
  `empresa_id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `categoria` varchar(80) DEFAULT NULL,
  `unidade` varchar(30) DEFAULT NULL,
  `preco` decimal(10,2) DEFAULT 0.00,
  `estoque` int(11) DEFAULT 0,
  `status` varchar(20) DEFAULT 'ativo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `produtos`
--

INSERT INTO `produtos` (`id`, `empresa_id`, `nome`, `categoria`, `unidade`, `preco`, `estoque`, `status`) VALUES
(4, 4, 'Shampoo', 'Shampoo', 'unid', 50.00, 10, 'ativo');

-- --------------------------------------------------------

--
-- Estrutura para tabela `profissionais`
--

CREATE TABLE `profissionais` (
  `id` int(11) NOT NULL,
  `empresa_id` int(11) NOT NULL,
  `nome` varchar(120) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telefone` varchar(40) DEFAULT NULL,
  `especialidade` varchar(100) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'ativo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `profissionais`
--

INSERT INTO `profissionais` (`id`, `empresa_id`, `nome`, `email`, `telefone`, `especialidade`, `status`) VALUES
(3, 4, 'Palloma', 'palloma@gmail.com', '84998856552', 'Cabeleireira', 'ativo');

-- --------------------------------------------------------

--
-- Estrutura para tabela `servicos`
--

CREATE TABLE `servicos` (
  `id` int(11) NOT NULL,
  `empresa_id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `categoria` varchar(80) DEFAULT NULL,
  `preco` decimal(10,2) DEFAULT 0.00,
  `duracao` int(11) DEFAULT 30,
  `status` varchar(20) DEFAULT 'ativo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `servicos`
--

INSERT INTO `servicos` (`id`, `empresa_id`, `nome`, `categoria`, `preco`, `duracao`, `status`) VALUES
(4, 4, 'Escova', 'Cabelo', 49.90, 45, '1');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `empresa_id` int(11) NOT NULL,
  `perfil` varchar(30) DEFAULT 'operador',
  `status` varchar(20) DEFAULT 'ativo',
  `created_at` datetime DEFAULT current_timestamp(),
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_token_expira` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`, `email`, `senha`, `empresa_id`, `perfil`, `status`, `created_at`, `reset_token`, `reset_token_expira`) VALUES
(14, 'Iodilson Junior', 'antologic@gmail.com', '$2b$10$DdGeR2b9CU/X3HVYEa5rneVOt3QOvA7oqt5kfaMudaZjK86gVkPaa', 4, 'admin', 'ativo', '2025-07-28 21:04:45', NULL, NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `vendas`
--

CREATE TABLE `vendas` (
  `id` int(11) NOT NULL,
  `empresa_id` int(11) NOT NULL,
  `cliente_id` int(11) DEFAULT NULL,
  `valor_total` decimal(10,2) DEFAULT 0.00,
  `status` varchar(20) DEFAULT 'pendente',
  `data` datetime DEFAULT NULL,
  `observacao` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `venda_itens`
--

CREATE TABLE `venda_itens` (
  `id` int(11) NOT NULL,
  `venda_id` int(11) NOT NULL,
  `produto_id` int(11) DEFAULT NULL,
  `quantidade` int(11) DEFAULT 1,
  `valor` decimal(10,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `agenda`
--
ALTER TABLE `agenda`
  ADD PRIMARY KEY (`id`),
  ADD KEY `empresa_id` (`empresa_id`),
  ADD KEY `cliente_id` (`cliente_id`),
  ADD KEY `profissional_id` (`profissional_id`),
  ADD KEY `servico_id` (`servico_id`);

--
-- Índices de tabela `assinaturas`
--
ALTER TABLE `assinaturas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `empresa_id` (`empresa_id`),
  ADD KEY `plano_id` (`plano_id`);

--
-- Índices de tabela `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `empresa_id` (`empresa_id`);

--
-- Índices de tabela `empresas`
--
ALTER TABLE `empresas`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `financeiro`
--
ALTER TABLE `financeiro`
  ADD PRIMARY KEY (`id`),
  ADD KEY `empresa_id` (`empresa_id`);

--
-- Índices de tabela `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `empresa_id` (`empresa_id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Índices de tabela `onboarding_progresso`
--
ALTER TABLE `onboarding_progresso`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unico_usuario_passo` (`usuario_id`,`passo`);

--
-- Índices de tabela `permissoes`
--
ALTER TABLE `permissoes`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `planos`
--
ALTER TABLE `planos`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `produtos`
--
ALTER TABLE `produtos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `empresa_id` (`empresa_id`);

--
-- Índices de tabela `profissionais`
--
ALTER TABLE `profissionais`
  ADD PRIMARY KEY (`id`),
  ADD KEY `empresa_id` (`empresa_id`);

--
-- Índices de tabela `servicos`
--
ALTER TABLE `servicos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `empresa_id` (`empresa_id`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `empresa_id` (`empresa_id`);

--
-- Índices de tabela `vendas`
--
ALTER TABLE `vendas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `empresa_id` (`empresa_id`),
  ADD KEY `cliente_id` (`cliente_id`);

--
-- Índices de tabela `venda_itens`
--
ALTER TABLE `venda_itens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `venda_id` (`venda_id`),
  ADD KEY `produto_id` (`produto_id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `agenda`
--
ALTER TABLE `agenda`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `assinaturas`
--
ALTER TABLE `assinaturas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `empresas`
--
ALTER TABLE `empresas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `financeiro`
--
ALTER TABLE `financeiro`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `logs`
--
ALTER TABLE `logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `onboarding_progresso`
--
ALTER TABLE `onboarding_progresso`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `permissoes`
--
ALTER TABLE `permissoes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `planos`
--
ALTER TABLE `planos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `produtos`
--
ALTER TABLE `produtos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `profissionais`
--
ALTER TABLE `profissionais`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `servicos`
--
ALTER TABLE `servicos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de tabela `vendas`
--
ALTER TABLE `vendas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `venda_itens`
--
ALTER TABLE `venda_itens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `agenda`
--
ALTER TABLE `agenda`
  ADD CONSTRAINT `agenda_ibfk_1` FOREIGN KEY (`empresa_id`) REFERENCES `empresas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `agenda_ibfk_2` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `agenda_ibfk_3` FOREIGN KEY (`profissional_id`) REFERENCES `profissionais` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `agenda_ibfk_4` FOREIGN KEY (`servico_id`) REFERENCES `servicos` (`id`) ON DELETE SET NULL;

--
-- Restrições para tabelas `assinaturas`
--
ALTER TABLE `assinaturas`
  ADD CONSTRAINT `assinaturas_ibfk_1` FOREIGN KEY (`empresa_id`) REFERENCES `empresas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `assinaturas_ibfk_2` FOREIGN KEY (`plano_id`) REFERENCES `planos` (`id`) ON DELETE SET NULL;

--
-- Restrições para tabelas `clientes`
--
ALTER TABLE `clientes`
  ADD CONSTRAINT `clientes_ibfk_1` FOREIGN KEY (`empresa_id`) REFERENCES `empresas` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `financeiro`
--
ALTER TABLE `financeiro`
  ADD CONSTRAINT `financeiro_ibfk_1` FOREIGN KEY (`empresa_id`) REFERENCES `empresas` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `logs`
--
ALTER TABLE `logs`
  ADD CONSTRAINT `logs_ibfk_1` FOREIGN KEY (`empresa_id`) REFERENCES `empresas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `logs_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL;

--
-- Restrições para tabelas `produtos`
--
ALTER TABLE `produtos`
  ADD CONSTRAINT `produtos_ibfk_1` FOREIGN KEY (`empresa_id`) REFERENCES `empresas` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `profissionais`
--
ALTER TABLE `profissionais`
  ADD CONSTRAINT `profissionais_ibfk_1` FOREIGN KEY (`empresa_id`) REFERENCES `empresas` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `servicos`
--
ALTER TABLE `servicos`
  ADD CONSTRAINT `servicos_ibfk_1` FOREIGN KEY (`empresa_id`) REFERENCES `empresas` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`empresa_id`) REFERENCES `empresas` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `vendas`
--
ALTER TABLE `vendas`
  ADD CONSTRAINT `vendas_ibfk_1` FOREIGN KEY (`empresa_id`) REFERENCES `empresas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `vendas_ibfk_2` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE SET NULL;

--
-- Restrições para tabelas `venda_itens`
--
ALTER TABLE `venda_itens`
  ADD CONSTRAINT `venda_itens_ibfk_1` FOREIGN KEY (`venda_id`) REFERENCES `vendas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `venda_itens_ibfk_2` FOREIGN KEY (`produto_id`) REFERENCES `produtos` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
