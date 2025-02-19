drop table AVALIA;
drop table FAZ_PARTE;
drop table TEM_NO_CARDAPIO;
drop table PEDIDO;
drop table RESTAURANTE;
drop table REFEICAO;
drop table CLIENTE;

create table RESTAURANTE(
	Id_Restaurante numeric(1) primary key,
	Nome varchar(40) not null,
	Localizacao varchar(50) not null,
	Inicio_Funcionamento time not null,
	Termino_Funcionamento time not null,
	Avaliacao numeric(3, 1) not null
);

create table REFEICAO(
	Id_Refeicao numeric(2) primary key,
	Nome varchar(40) not null,
	Preco numeric(5, 2) not null,
	Categoria varchar(20) not null,
	Descricao varchar(50) not null,
	Url_foto varchar(100) not null
);

create table Usuario(
	Cpf varchar(11) primary key,
	Nome varchar(20) not null,
	Endereco varchar(50) not null,
	Telefone varchar(11) not null,
	Email varchar(50) not null,
	Senha varchar(15) not null,
	Cliente_Funcionario varchar(1) not null check(Cliente_Funcionario in ('C', 'F'))
);

create table PEDIDO(
	Id_Pedido numeric(5) primary key,
	Valor_Pago numeric(5, 2) not null,
	Forma_Pagamento varchar(20) not null,
	Id_Restaurante numeric(1) not null references RESTAURANTE(Id_Restaurante),
	Cpf_Cliente varchar(11) not null references USUARIO(Cpf),
	Data_Entrega date not null
);

create table TEM_NO_CARDAPIO(
	Id_Restaurante numeric(1) references RESTAURANTE(Id_Restaurante),
	Id_Refeicao numeric(2) references REFEICAO(Id_Refeicao),
	Quantidade_Disponivel numeric(3) not null,
	primary key(Id_Restaurante, Id_Refeicao)
);

create table FAZ_PARTE(
	Id_Pedido numeric(5) references PEDIDO(Id_Pedido),
	Id_Refeicao numeric(2) references REFEICAO(Id_Refeicao),
	primary key(Id_Pedido, Id_Refeicao)
);

create table AVALIA(
	Cpf_Cliente varchar(11) references USUARIO(Cpf),
	Id_Restaurante numeric(1) references RESTAURANTE(Id_Restaurante),
	Nota numeric(2) not null,
	Descricao varchar(100) not null,
	primary key(Cpf_Cliente, Id_Restaurante)
);

-- RESTAURANTE
INSERT INTO RESTAURANTE (Id_Restaurante, Nome, Localizacao, Inicio_Funcionamento, Termino_Funcionamento, Avaliacao) VALUES
(1, 'Sabores do Sul', 'Rua das Flores, 123', '11:00', '22:00', 9),
(2, 'Massas Italianas', 'Avenida Principal, 456', '18:00', '23:00', 8.4),
(3, 'Sushi Express', 'Rua do Sol, 789', '12:00', '21:00', 9.6),
(4, 'Cantina Mineira', 'Rua da Bahia, 1011', '11:00', '20:00', 8.0),
(5, 'Burger Mania', 'Avenida Atlântica, 1213', '17:00', '23:00', 9.2);

-- REFEICAO
INSERT INTO REFEICAO (Id_Refeicao, Nome, Preco, Categoria, Descricao, Url_foto) VALUES
(1, 'Churrasco Misto', 55.00, 'Carnes', 'Variedade de carnes nobres', 'url_churrasco.jpg'),
(2, 'Pizza Margherita', 35.00, 'Massa', 'Massa fina com mussarela e manjericão', 'url_pizza.jpg'),
(3, 'Salmão Sashimi', 42.00, 'Peixes', 'Salmão fresco e saboroso', 'url_sashimi.jpg'),
(4, 'Feijoada Mineira', 40.00, 'Caseira', 'Feijão preto com carnes variadas', 'url_feijoada.jpg'),
(5, 'X-Tudo', 25.00, 'Lanche', 'Hambúrguer com todos os acompanhamentos', 'url_xtudo.jpg');

-- CLIENTE
INSERT INTO USUARIO (Cpf, Nome, Endereco, Telefone, Email, Senha, Cliente_Funcionario) VALUES
('12345678901', 'Maria Silva', 'Rua A, 10', '99999999999', 'maria@email.com', 'senha123', 'C'),
('98765432109', 'João Pereira', 'Rua B, 20', '88888888888', 'joao@email.com', 'senha456', 'C'),
('11122233344', 'Ana Souza', 'Rua C, 30', '77777777777', 'ana@email.com', 'senha789', 'C'),
('44455566677', 'Pedro Oliveira', 'Rua D, 40', '66666666666', 'pedro@email.com', 'senha101', 'C'),
('88899900011', 'Carla Santos', 'Rua E, 50', '55555555555', 'carla@email.com', 'senha112', 'C'),
('55577711100', 'Arthur Rodrigues', 'Rua F, 90', '33333333333', 'arthur@email.com', 'senha202', 'F');

-- ENTREGADOR
INSERT INTO ENTREGADOR (Cpf_Entregador, Nome, Tipo_Veiculo, Placa_Veiculo) VALUES
('55566677788', 'Carlos Oliveira', 'Moto', 'ABC1234'),
('99988877766', 'Fernanda Santos', 'Carro', 'XYZ5678'),
('12378945600', 'Rodrigo Almeida', 'Moto', 'DEF9012'),
('45612378900', 'Juliana Silva', 'Moto', 'GHI3456'),
('78945612300', 'Bruno Pereira', 'Carro', 'JKL7890');

-- PEDIDO
INSERT INTO PEDIDO (Id_Pedido, Valor_Pago, Forma_Pagamento, Id_Restaurante, Cpf_Cliente, Data_Entrega) VALUES
(1, 75.00, 'Cartão', 1, '12345678901', '2024-07-20'),
(2, 40.00, 'Dinheiro', 2, '98765432109', '2024-07-20'),
(3, 62.00, 'Cartão', 3, '11122233344', '2024-07-21'),
(4, 35.00, 'Dinheiro', 1, '44455566677', '2024-07-21'),
(5, 50.00, 'Cartão', 2, '88899900011', '2024-07-22');

-- TEM_NO_CARDAPIO
INSERT INTO TEM_NO_CARDAPIO (Id_Restaurante, Id_Refeicao, Quantidade_Disponivel) VALUES
(1, 1, 10),
(2, 2, 8),
(3, 3, 7),
(4, 4, 15),
(5, 5, 10);

-- FAZ_PARTE
INSERT INTO FAZ_PARTE (Id_Pedido, Id_Refeicao) VALUES
(1, 1),
(1, 4),
(2, 2),
(3, 3),
(4, 5);

-- AVALIA
INSERT INTO AVALIA (Cpf_Cliente, Id_Restaurante, Nota, Descricao) VALUES
('12345678901', 1, 8, 'Ótimo churrasco!'),
('98765432109', 2, 10, 'Pizza deliciosa!'),
('11122233344', 3, 8, 'Sushi fresco e saboroso.'),
('44455566677', 1, 6, 'Bom, mas poderia ser melhor.'),
('88899900011', 2, 8, 'Gostei muito da massa!');

select * from RESTAURANTE;
select * from REFEICAO;
select * from USUARIO;
select * from PEDIDO;
select * from TEM_NO_CARDAPIO;
select * from FAZ_PARTE;
select * from AVALIA;