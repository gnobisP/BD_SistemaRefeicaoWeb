# Trabalho Prático - Sistema de Refeições via Web
Este repositório contém a implementação de um [Sistema de Refeição Via Web](diagrama/DER-VendaRefeicaoWeb.png). O traballho foi desenvolvido para aplicar os conhecimentos de banco de dados e desenvolvimento back-end.

## Integrantes
- Arthur de Alemida Sales Secundino
- Gabriel Gallegos Ribeiro
- Gustavo Pimenta Cordeiro

## 🛠 Tecnologias Utilizadas 
- **Framework Web**: [Flask - 3.1.0] 
- **Linguagem de Programação**: [Python - 3.12.3]
- **Framework Front-End**: [Bootstrap 5]
- **IDE**: [VSCode]

## 🎥 Vídeo Demonstrativo

[![Video Demonstrativo][![Video Demonstrativo](https://img.youtube.com/vi/0DNQGaZ7qVc/0.jpg)](https://www.youtube.com/watch?v=0DNQGaZ7qVc)


O objetivo do projeto foi a criação de um site para realizar o controle de um restaurante. Para o trabalho foi criado tanto o front-end quanto o back-end. O sistema de restaurante conta com area de usuario e area de funcionario. A area de cliente o usuario pode realizar um pedidio de refeição, criar uma avalização para o pedido, modificar o seu perfil entre outras funcionalidades.
Enquanto na area de funcionario é possível cadastrar uma nova refeição, cadastrar um novo funcionario, cadastrar um cupom de descontro entre outras funcionalidades
Para o projeto, foi criado regras de negócio, como por exemplo, não é possível realizar pedido depois de um horário no restautante, qualque pedido via pix deve dar desconto para o cliente, o cliente deve pode visuzliar o historico de pedidos, somente clientes que realizaram um pedido pode realizar avaliações ,entre outras

## Objetivo
O objetivo deste projeto foi desenvolver um sistema web para o controle de um restaurante, abrangendo tanto o front-end quanto o back-end. O sistema foi dividido em duas áreas principais: área do usuário e área do funcionário.

### Área do Usuário
Na área do usuário, o cliente pode:

- Realizar pedidos de refeições.
- Criar avaliações para os pedidos realizados.
- Modificar seu perfil e preferências pessoais.

### Área do Funcionário
Na área do funcionário, é possível:

- Cadastrar novas refeições no cardápio.
- Cadastrar novos funcionários.
- Cadastrar cupons de desconto, entre outras funcionalidades.

### Regras de Negócio
O sistema implementa algumas regras de negócios essenciais para a operação do restaurante, tais como:

- Não é permitido realizar pedidos após um horário específico no restaurante.
- Pedidos pagos via PIX recebem um desconto automático.
- Os clientes podem visualizar seu histórico de pedidos.
- Somente clientes que realizaram pedidos podem criar avaliações sobre as refeições.


## 🚀 Como rodar o Projeto
  - **Clone o repositório:**
```sh
  git clone https://github.com/gnobisP/BD_SistemaRefeicaoWeb.git
  cd BD_SistemaRefeicaoWeb
```

## 📁 Estrutura do Projeto

A estrutura de diretórios está organizada da seguinte forma:

### 📂 `adapters`
Contém módulos responsáveis pela adaptação e interação com o banco de dados.

- **`database_adapter.py`**: Gerencia a conexão e operações com o banco de dados.

---

### 📂 `assets`
Diretório reservado para armazenar arquivos de mídia e outros recursos estáticos.

---

### 📂 `dados`
Armazena informações utilizadas pelo sistema, como arquivos de configuração ou bases de dados locais.

---

### 📂 `diagrama`
Contém diagramas e representações visuais do sistema, como modelagens de banco de dados ou fluxos de processos.

---

### 📂 `domain`
Este diretório contém os principais modelos e serviços da aplicação.

- **`models.py`**: Define as classes e estruturas de dados usadas pelo sistema.
- **`services.py`**: Implementa as regras de negócio e funcionalidades da aplicação.

---

### 📂 `static`
Contém arquivos estáticos utilizados na aplicação, como estilos e scripts.

- **`css/`**: Arquivos CSS para estilização do frontend.
- **`js/`**: Scripts JavaScript utilizados na aplicação.

---

### 📂 `templates`
Armazena os arquivos HTML utilizados pelo Flask para renderização das páginas web.

---

### Outros Arquivos
- **`app.py`**: Arquivo principal que inicia a aplicação Flask.
- **`.gitignore`**: Define os arquivos e diretórios que devem ser ignorados pelo Git.
- **`LICENSE`**: Arquivo contendo a licença do projeto.
- **`README.md`**: Documentação principal do projeto.
- **`ScriptQueryTrabalho.sql`**: Contém as queries SQL utilizadas no projeto.
- **`TODO`**: Lista de pendências e melhorias futuras para o projeto.

---
