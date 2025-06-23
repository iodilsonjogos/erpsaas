-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 22/06/2025 às 06:35
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
  `cliente` varchar(100) NOT NULL,
  `profissional_id` int(11) NOT NULL,
  `data` date NOT NULL,
  `hora` time NOT NULL
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
-- Estrutura para tabela `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `id_clinica` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `telefone` varchar(30) DEFAULT NULL
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
(2, 1, NULL, 'iane Luz', 'unha', '84987654321', '2025-06-20 03:08:28', NULL, 'na_fila', 'teste n-11'),
(3, 1, NULL, 'Flavia costa', 'dedpilação', '84988778899', '2025-06-20 03:21:40', '2025-06-20 23:04:50', 'removido', 'teste n12'),
(4, 1, NULL, 'miguel Luz', 'Corte', '84987654321', '2025-06-20 23:04:36', NULL, 'na_fila', 'teste n- 12'),
(5, 1, NULL, 'Iodilson Junior', 'corte', '84994753059', '2025-06-20 23:16:40', NULL, 'na_fila', 'teste n-15');

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
-- Estrutura para tabela `servicos`
--

CREATE TABLE `servicos` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `duracao` int(11) NOT NULL DEFAULT 30
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `agendamentos`
--
ALTER TABLE `agendamentos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `profissional_id` (`profissional_id`);

--
-- Índices de tabela `agendamento_servicos`
--
ALTER TABLE `agendamento_servicos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `agendamento_id` (`agendamento_id`),
  ADD KEY `servico_id` (`servico_id`);

--
-- Índices de tabela `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

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
-- Índices de tabela `servicos`
--
ALTER TABLE `servicos`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT de tabela `clientes`
--
ALTER TABLE `clientes`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
-- AUTO_INCREMENT de tabela `servicos`
--
ALTER TABLE `servicos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `agendamentos`
--
ALTER TABLE `agendamentos`
  ADD CONSTRAINT `agendamentos_ibfk_1` FOREIGN KEY (`profissional_id`) REFERENCES `profissionais` (`id`);

--
-- Restrições para tabelas `agendamento_servicos`
--
ALTER TABLE `agendamento_servicos`
  ADD CONSTRAINT `agendamento_servicos_ibfk_1` FOREIGN KEY (`agendamento_id`) REFERENCES `agendamentos` (`id`),
  ADD CONSTRAINT `agendamento_servicos_ibfk_2` FOREIGN KEY (`servico_id`) REFERENCES `servicos` (`id`);

--
-- Restrições para tabelas `profissional_especialidade`
--
ALTER TABLE `profissional_especialidade`
  ADD CONSTRAINT `profissional_especialidade_ibfk_1` FOREIGN KEY (`profissional_id`) REFERENCES `profissionais` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `profissional_especialidade_ibfk_2` FOREIGN KEY (`especialidade_id`) REFERENCES `especialidades` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
