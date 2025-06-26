-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 26/06/2025 às 19:36
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.0.30

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
-- Estrutura para tabela `agendamentos`
--

CREATE TABLE `agendamentos` (
  `id` int(11) NOT NULL,
  `cliente_id` int(11) NOT NULL,
  `profissional_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `servico_id` int(11) NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  `data` date NOT NULL,
  `hora` time NOT NULL,
  `obs` varchar(255) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'agendado',
  `criado_em` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `agendamento_servicos`
--

CREATE TABLE `agendamento_servicos` (
  `id` int(11) NOT NULL,
  `agendamento_id` int(11) NOT NULL,
  `servico_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `atendimentos`
--

CREATE TABLE `atendimentos` (
  `id` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_fila` int(11) DEFAULT NULL,
  `servico` varchar(100) DEFAULT NULL,
  `produtos` text DEFAULT NULL,
  `profissional_id` int(11) DEFAULT NULL,
  `data_hora_inicio` datetime DEFAULT current_timestamp(),
  `data_hora_fim` datetime DEFAULT NULL,
  `valor_total` decimal(10,2) DEFAULT NULL,
  `forma_pagamento` varchar(30) DEFAULT NULL,
  `status` enum('em_andamento','finalizado','cancelado') DEFAULT 'em_andamento',
  `observacao` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `id_clinica` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `telefone` varchar(30) DEFAULT NULL,
  `cpf` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `clientes`
--

INSERT INTO `clientes` (`id`, `id_clinica`, `nome`, `telefone`, `cpf`) VALUES
(1, 0, 'João Teste', '84999990000', '12345678900');

-- --------------------------------------------------------

--
-- Estrutura para tabela `comissao_profissional`
--

CREATE TABLE `comissao_profissional` (
  `id` int(11) NOT NULL,
  `profissional_id` int(11) NOT NULL,
  `venda_id` int(11) DEFAULT NULL,
  `percentual` decimal(5,2) DEFAULT NULL,
  `valor` decimal(10,2) DEFAULT NULL,
  `data_lancamento` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `datas_comemorativas`
--

CREATE TABLE `datas_comemorativas` (
  `id` int(11) NOT NULL,
  `nome` varchar(80) NOT NULL,
  `data` date NOT NULL,
  `tipo` enum('Nacional','Regional','Religiosa','Personalizada') DEFAULT 'Nacional',
  `descricao` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `datas_comemorativas`
--

INSERT INTO `datas_comemorativas` (`id`, `nome`, `data`, `tipo`, `descricao`) VALUES
(1, 'Independência do Brasil', '2025-09-07', 'Nacional', 'Feriado nacional');

-- --------------------------------------------------------

--
-- Estrutura para tabela `especialidades`
--

CREATE TABLE `especialidades` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `fila_espera`
--

CREATE TABLE `fila_espera` (
  `id` int(11) NOT NULL,
  `id_clinica` int(11) NOT NULL,
  `id_cliente` int(11) DEFAULT NULL,
  `nome_manual` varchar(120) DEFAULT NULL,
  `servico` varchar(80) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `data_hora_entrada` datetime NOT NULL DEFAULT current_timestamp(),
  `data_hora_saida` datetime DEFAULT NULL,
  `status` enum('na_fila','atendido','removido') NOT NULL DEFAULT 'na_fila',
  `observacao` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `fila_espera`
--

INSERT INTO `fila_espera` (`id`, `id_clinica`, `id_cliente`, `nome_manual`, `servico`, `telefone`, `data_hora_entrada`, `data_hora_saida`, `status`, `observacao`) VALUES
(1, 1, NULL, 'Junior filho', 'corte', '84994753059', '2025-06-20 02:31:31', '2025-06-20 23:05:08', 'atendido', 'teste n-10'),
(2, 1, NULL, 'iane Luz', 'unha', '84987654321', '2025-06-20 03:08:28', '2025-06-22 16:46:31', 'atendido', 'teste n-11'),
(3, 1, NULL, 'Flavia costa', 'dedpilação', '84988778899', '2025-06-20 03:21:40', '2025-06-20 23:04:50', 'removido', 'teste n12'),
(4, 1, NULL, 'miguel Luz', 'Corte', '84987654321', '2025-06-20 23:04:36', '2025-06-22 20:07:12', 'atendido', 'teste n- 12'),
(5, 1, NULL, 'Iodilson Junior', 'corte', '84994753059', '2025-06-20 23:16:40', '2025-06-22 23:24:36', 'removido', 'teste n-15'),
(6, 1, NULL, 'joão Paulo', 'depilação', '84994753059', '2025-06-22 19:26:34', '2025-06-24 22:40:20', 'removido', 'teste novo modal'),
(7, 1, NULL, 'pablo', 'corte', '84999885462', '2025-06-22 19:44:29', '2025-06-24 22:40:50', 'atendido', 'novo modal teste5'),
(8, 1, 0, 'Miguel luz', 'corte', '84995684562', '2025-06-22 20:07:04', '2025-06-24 22:40:54', 'atendido', 'teste movo modal n5'),
(9, 1, 0, 'jaopj', 'afjiopej', '65468465465654.64', '2025-06-22 20:56:34', '2025-06-22 20:57:15', 'removido', ''),
(10, 1, 0, 'Iodilson Jr', 'corte', '84994753059', '2025-06-22 20:57:55', '2025-06-24 22:41:01', 'removido', ''),
(11, 1, 1, 'João Teste', '', '84999990000', '2025-06-22 22:09:03', '2025-06-22 22:09:10', 'removido', ''),
(12, 1, 1, 'João Teste', '', '84999990000', '2025-06-22 22:16:33', '2025-06-22 22:17:33', 'removido', ''),
(13, 1, 1, 'João Teste', '', '84999990000', '2025-06-22 22:20:48', '2025-06-22 22:20:55', 'removido', ''),
(14, 1, 1, 'João Teste', '', '84999990000', '2025-06-22 22:21:04', '2025-06-25 14:47:33', 'removido', ''),
(15, 1, 0, 'raimundo', 'cirtes', '99554466334', '2025-06-22 23:08:17', NULL, 'na_fila', ''),
(16, 1, 1, 'João Teste', '', '84999990000', '2025-06-25 14:47:18', NULL, 'na_fila', '');

-- --------------------------------------------------------

--
-- Estrutura para tabela `financeiro`
--

CREATE TABLE `financeiro` (
  `id` int(11) NOT NULL,
  `tipo` enum('receita','despesa') NOT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `data_lancamento` date DEFAULT NULL,
  `valor` decimal(10,2) DEFAULT NULL,
  `categoria` varchar(50) DEFAULT NULL,
  `forma_pagamento` varchar(30) DEFAULT NULL,
  `status` enum('pago','pendente') DEFAULT 'pendente',
  `venda_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `historico_atendimento`
--

CREATE TABLE `historico_atendimento` (
  `id` int(11) NOT NULL,
  `atendimento_id` int(11) NOT NULL,
  `acao` varchar(100) DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `data_hora` datetime DEFAULT current_timestamp(),
  `observacao` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `item_venda`
--

CREATE TABLE `item_venda` (
  `id` int(11) NOT NULL,
  `venda_id` int(11) NOT NULL,
  `produto_id` int(11) NOT NULL,
  `quantidade` int(11) DEFAULT 1,
  `preco_unitario` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `produtos`
--

CREATE TABLE `produtos` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `unidade` varchar(20) DEFAULT NULL,
  `categoria` varchar(50) DEFAULT NULL,
  `preco_compra` decimal(10,2) DEFAULT NULL,
  `preco_venda` decimal(10,2) DEFAULT NULL,
  `estoque` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `profissionais`
--

CREATE TABLE `profissionais` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `documento` varchar(18) DEFAULT NULL,
  `tipo_doc` enum('CPF','CNPJ') DEFAULT NULL,
  `data_nascimento` date DEFAULT NULL,
  `genero` enum('Masculino','Feminino','Outro','Prefiro não dizer') DEFAULT NULL,
  `especialidades` text DEFAULT NULL,
  `disponibilidade` enum('Manhã','Tarde','Full time') DEFAULT NULL,
  `cep` varchar(10) DEFAULT NULL,
  `endereco` varchar(150) DEFAULT NULL,
  `numero` varchar(10) DEFAULT NULL,
  `complemento` varchar(100) DEFAULT NULL,
  `bairro` varchar(100) DEFAULT NULL,
  `cidade` varchar(100) DEFAULT NULL,
  `uf` char(2) DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `atendimentos` int(11) DEFAULT 0,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('disponivel','atendimento','pausa') NOT NULL DEFAULT 'disponivel'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `profissionais`
--

INSERT INTO `profissionais` (`id`, `nome`, `email`, `telefone`, `documento`, `tipo_doc`, `data_nascimento`, `genero`, `especialidades`, `disponibilidade`, `cep`, `endereco`, `numero`, `complemento`, `bairro`, `cidade`, `uf`, `foto`, `atendimentos`, `criado_em`, `status`) VALUES
(1, 'Maria Silva', NULL, NULL, NULL, NULL, '1989-07-15', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2025-06-19 21:05:24', 'disponivel');

-- --------------------------------------------------------

--
-- Estrutura para tabela `profissional_especialidade`
--

CREATE TABLE `profissional_especialidade` (
  `id` int(11) NOT NULL,
  `profissional_id` int(11) DEFAULT NULL,
  `especialidade_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `prontuario`
--

CREATE TABLE `prontuario` (
  `id` int(11) NOT NULL,
  `cliente_id` int(11) NOT NULL,
  `profissional_id` int(11) NOT NULL,
  `data_registro` datetime DEFAULT current_timestamp(),
  `anamnese` text DEFAULT NULL,
  `evolucao` text DEFAULT NULL,
  `arquivos` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `servicos`
--

CREATE TABLE `servicos` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `duracao` int(11) NOT NULL DEFAULT 30
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `perfil` enum('admin','recepcionista','profissional') DEFAULT 'profissional',
  `status` enum('ativo','inativo') DEFAULT 'ativo',
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `vendas`
--

CREATE TABLE `vendas` (
  `id` int(11) NOT NULL,
  `cliente_id` int(11) DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `data_venda` datetime DEFAULT current_timestamp(),
  `valor_total` decimal(10,2) DEFAULT NULL,
  `forma_pagamento` varchar(30) DEFAULT NULL,
  `status` enum('paga','pendente','cancelada') DEFAULT 'pendente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `agendamentos`
--
ALTER TABLE `agendamentos`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `agendamento_servicos`
--
ALTER TABLE `agendamento_servicos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `agendamento_id` (`agendamento_id`),
  ADD KEY `servico_id` (`servico_id`);

--
-- Índices de tabela `atendimentos`
--
ALTER TABLE `atendimentos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_cliente` (`id_cliente`),
  ADD KEY `profissional_id` (`profissional_id`);

--
-- Índices de tabela `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `comissao_profissional`
--
ALTER TABLE `comissao_profissional`
  ADD PRIMARY KEY (`id`),
  ADD KEY `profissional_id` (`profissional_id`),
  ADD KEY `venda_id` (`venda_id`);

--
-- Índices de tabela `datas_comemorativas`
--
ALTER TABLE `datas_comemorativas`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `especialidades`
--
ALTER TABLE `especialidades`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `fila_espera`
--
ALTER TABLE `fila_espera`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_clinica` (`id_clinica`),
  ADD KEY `status` (`status`),
  ADD KEY `id_cliente` (`id_cliente`);

--
-- Índices de tabela `financeiro`
--
ALTER TABLE `financeiro`
  ADD PRIMARY KEY (`id`),
  ADD KEY `venda_id` (`venda_id`);

--
-- Índices de tabela `historico_atendimento`
--
ALTER TABLE `historico_atendimento`
  ADD PRIMARY KEY (`id`),
  ADD KEY `atendimento_id` (`atendimento_id`);

--
-- Índices de tabela `item_venda`
--
ALTER TABLE `item_venda`
  ADD PRIMARY KEY (`id`),
  ADD KEY `venda_id` (`venda_id`),
  ADD KEY `produto_id` (`produto_id`);

--
-- Índices de tabela `produtos`
--
ALTER TABLE `produtos`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `profissionais`
--
ALTER TABLE `profissionais`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `profissional_especialidade`
--
ALTER TABLE `profissional_especialidade`
  ADD PRIMARY KEY (`id`),
  ADD KEY `profissional_id` (`profissional_id`),
  ADD KEY `especialidade_id` (`especialidade_id`);

--
-- Índices de tabela `prontuario`
--
ALTER TABLE `prontuario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cliente_id` (`cliente_id`),
  ADD KEY `profissional_id` (`profissional_id`);

--
-- Índices de tabela `servicos`
--
ALTER TABLE `servicos`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Índices de tabela `vendas`
--
ALTER TABLE `vendas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cliente_id` (`cliente_id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `agendamentos`
--
ALTER TABLE `agendamentos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `agendamento_servicos`
--
ALTER TABLE `agendamento_servicos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `atendimentos`
--
ALTER TABLE `atendimentos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `comissao_profissional`
--
ALTER TABLE `comissao_profissional`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `datas_comemorativas`
--
ALTER TABLE `datas_comemorativas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `especialidades`
--
ALTER TABLE `especialidades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `fila_espera`
--
ALTER TABLE `fila_espera`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de tabela `financeiro`
--
ALTER TABLE `financeiro`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `historico_atendimento`
--
ALTER TABLE `historico_atendimento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `item_venda`
--
ALTER TABLE `item_venda`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `produtos`
--
ALTER TABLE `produtos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `profissionais`
--
ALTER TABLE `profissionais`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `profissional_especialidade`
--
ALTER TABLE `profissional_especialidade`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `prontuario`
--
ALTER TABLE `prontuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `servicos`
--
ALTER TABLE `servicos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `vendas`
--
ALTER TABLE `vendas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `agendamento_servicos`
--
ALTER TABLE `agendamento_servicos`
  ADD CONSTRAINT `agendamento_servicos_ibfk_1` FOREIGN KEY (`agendamento_id`) REFERENCES `agendamentos` (`id`),
  ADD CONSTRAINT `agendamento_servicos_ibfk_2` FOREIGN KEY (`servico_id`) REFERENCES `servicos` (`id`);

--
-- Restrições para tabelas `atendimentos`
--
ALTER TABLE `atendimentos`
  ADD CONSTRAINT `atendimentos_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id`),
  ADD CONSTRAINT `atendimentos_ibfk_2` FOREIGN KEY (`profissional_id`) REFERENCES `profissionais` (`id`);

--
-- Restrições para tabelas `comissao_profissional`
--
ALTER TABLE `comissao_profissional`
  ADD CONSTRAINT `comissao_profissional_ibfk_1` FOREIGN KEY (`profissional_id`) REFERENCES `profissionais` (`id`),
  ADD CONSTRAINT `comissao_profissional_ibfk_2` FOREIGN KEY (`venda_id`) REFERENCES `vendas` (`id`);

--
-- Restrições para tabelas `financeiro`
--
ALTER TABLE `financeiro`
  ADD CONSTRAINT `financeiro_ibfk_1` FOREIGN KEY (`venda_id`) REFERENCES `vendas` (`id`);

--
-- Restrições para tabelas `historico_atendimento`
--
ALTER TABLE `historico_atendimento`
  ADD CONSTRAINT `historico_atendimento_ibfk_1` FOREIGN KEY (`atendimento_id`) REFERENCES `atendimentos` (`id`);

--
-- Restrições para tabelas `item_venda`
--
ALTER TABLE `item_venda`
  ADD CONSTRAINT `item_venda_ibfk_1` FOREIGN KEY (`venda_id`) REFERENCES `vendas` (`id`),
  ADD CONSTRAINT `item_venda_ibfk_2` FOREIGN KEY (`produto_id`) REFERENCES `produtos` (`id`);

--
-- Restrições para tabelas `profissional_especialidade`
--
ALTER TABLE `profissional_especialidade`
  ADD CONSTRAINT `profissional_especialidade_ibfk_1` FOREIGN KEY (`profissional_id`) REFERENCES `profissionais` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `profissional_especialidade_ibfk_2` FOREIGN KEY (`especialidade_id`) REFERENCES `especialidades` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `prontuario`
--
ALTER TABLE `prontuario`
  ADD CONSTRAINT `prontuario_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`),
  ADD CONSTRAINT `prontuario_ibfk_2` FOREIGN KEY (`profissional_id`) REFERENCES `profissionais` (`id`);

--
-- Restrições para tabelas `vendas`
--
ALTER TABLE `vendas`
  ADD CONSTRAINT `vendas_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`),
  ADD CONSTRAINT `vendas_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
