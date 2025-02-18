create table RESTAURANTE(
	Id_Restaurante numeric(1) primary key,
	Nome varchar(20) not null,
	Localizacao varchar(50) not null,
	Inicio_Funcionamento time not null,
	TerminoFuncionamento time not null,
	Avaliacao numeric(3, 1) not null
);

alter table RESTAURANTE alter column Nome type varchar(40);

create table REFEICAO(
	Id_Refeicao numeric(2) primary key,
	Nome varchar(20) not null,
	Preco numeric(5, 2) not null,
	Descircao varchar(50) not null,
	Url_foto varchar(100) not null
);

alter table REFEICAO alter column Nome type varchar(40);

create table CATEGORIA(
	Id_Refeicao numeric(2) references REFEICAO(Id_Refeicao),
	Categoria varchar(20),
	primary key(Id_Refeicao, Categoria)
);

create table CLIENTE(
	Cpf_Cliente varchar(11) primary key,
	Nome varchar(20) not null,
	Endereco varchar(50) not null,
	Telefone varchar(11) not null,
	Email varchar(50) not null,
	Senha varchar(15) not null
);

create table ENTREGADOR(
	Cpf_Entregador varchar(11) primary key,
	Nome varchar(20) not null,
	Tipo_Veiculo varchar(15) not null,
	Placa_Veiculo varchar(10) not null
);

create table PEDIDO(
	Id_Pedido numeric(5) primary key,
	Valor_Pago numeric(5, 2) not null,
	Forma_Pagamento varchar(20) not null,
	Id_Restaurante numeric(1) not null references RESTAURANTE(Id_Restaurante),
	Cpf_Cliente varchar(11) not null references CLIENTE(Cpf_Cliente),
	Cpf_Entregador varchar(11) not null references ENTREGADOR(Cpf_Entregador),
	Data_Entrega date not null,
	Frete numeric(5,2) not null
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
	Cpf_Cliente varchar(11) references CLIENTE(Cpf_Cliente),
	Id_Restaurante numeric(1) references RESTAURANTE(Id_Restaurante),
	Nota numeric(2) not null,
	Descricao varchar(100) not null,
	primary key(Cpf_Cliente, Id_Restaurante)
);

-- RESTAURANTE
INSERT INTO RESTAURANTE (Id_Restaurante, Nome, Localizacao, Inicio_Funcionamento, TerminoFuncionamento, Avaliacao) VALUES
(1, 'Sabores do Sul', 'Rua das Flores, 123', '11:00', '22:00', 4.5),
(2, 'Massas Italianas', 'Avenida Principal, 456', '18:00', '23:00', 4.2),
(3, 'Sushi Express', 'Rua do Sol, 789', '12:00', '21:00', 4.8),
(4, 'Cantina Mineira', 'Rua da Bahia, 1011', '11:00', '20:00', 4.0),
(5, 'Burger Mania', 'Avenida Atlântica, 1213', '17:00', '23:00', 4.6),
(6, 'Pizzaria Bella Napoli', 'Rua da Praia, 1415', '18:00', '23:00', 4.7),
(7, 'Churrascaria Gaúcha', 'Avenida Beira Mar, 1617', '11:00', '22:00', 4.3),
(8, 'Restaurante Vegano', 'Rua Verde, 1819', '12:00', '21:00', 4.9),
(9, 'Tacos Mexicanos', 'Avenida Central, 2021', '17:00', '23:00', 4.4);

-- REFEICAO
INSERT INTO REFEICAO (Id_Refeicao, Nome, Preco, Descircao, Url_foto) VALUES
(1, 'Churrasco Misto', 55.00, 'Variedade de carnes nobres', 'url_churrasco.jpg'),
(2, 'Pizza Margherita', 35.00, 'Massa fina com mussarela e manjericão', 'url_pizza.jpg'),
(3, 'Salmão Sashimi', 42.00, 'Salmão fresco e saboroso', 'url_sashimi.jpg'),
(4, 'Feijoada Mineira', 40.00, 'Feijão preto com carnes variadas', 'url_feijoada.jpg'),
(5, 'X-Tudo', 25.00, 'Hambúrguer com todos os acompanhamentos', 'url_xtudo.jpg'),
(6, 'Lasanha à Bolonhesa', 40.00, 'Massa fresca com molho à bolonhesa', 'url_lasanha.jpg'),
(7, 'Temaki Salmão', 30.00, 'Cone de alga com arroz e salmão', 'url_temaki.jpg'),
(8, 'Pão de Queijo', 15.00, 'Pão de queijo quentinho', 'url_paoqueijo.jpg'),
(9, 'Milkshake de Chocolate', 20.00, 'Milkshake cremoso de chocolate', 'url_milkshake.jpg'),
(10, 'Salada Caesar', 28.00, 'Alface, frango grelhado e molho caesar', 'url_salada.jpg'),
(11, 'Nhoque ao Sugo', 38.00, 'Nhoque caseiro com molho de tomate', 'url_nhoque.jpg'),
(12, 'Hot Roll', 35.00, 'Sushi enrolado com salmão e cream cheese', 'url_hotroll.jpg'),
(13, 'Frango Assado', 45.00, 'Frango inteiro assado com batatas', 'url_frango.jpg'),
(14, 'Sanduíche Natural', 22.00, 'Pão integral com recheio leve', 'url_sanduiche.jpg');

-- CATEGORIA
INSERT INTO CATEGORIA (Id_Refeicao, Categoria) VALUES
(1, 'Carnes'),
(2, 'Massas'),
(3, 'Japonesa'),
(4, 'Mineira'),
(5, 'Lanches'),
(6, 'Massas'),
(7, 'Japonesa'),
(8, 'Mineira'),
(9, 'Bebidas'),
(10, 'Saudável'),
(11, 'Massas'),
(12, 'Japonesa'),
(13, 'Aves'),
(14, 'Lanches');

-- CLIENTE
INSERT INTO CLIENTE (Cpf_Cliente, Nome, Endereco, Telefone, Email, Senha) VALUES
('12345678901', 'Maria Silva', 'Rua A, 10', '99999999999', 'maria@email.com', 'senha123'),
('98765432109', 'João Pereira', 'Rua B, 20', '88888888888', 'joao@email.com', 'senha456'),
('11122233344', 'Ana Souza', 'Rua C, 30', '77777777777', 'ana@email.com', 'senha789'),
('44455566677', 'Pedro Oliveira', 'Rua D, 40', '66666666666', 'pedro@email.com', 'senha101'),
('88899900011', 'Carla Santos', 'Rua E, 50', '55555555555', 'carla@email.com', 'senha112'),
('22233344455', 'Mariana Almeida', 'Rua F, 60', '44444444444', 'mariana@email.com', 'senha123'),
('66677788899', 'Rafael Souza', 'Rua G, 70', '33333333333', 'rafael@email.com', 'senha456'),
('00011122233', 'Laura Pereira', 'Rua H, 80', '22222222222', 'laura@email.com', 'senha789'),
('55566677799', 'Gustavo Oliveira', 'Rua I, 90', '11111111111', 'gustavo@email.com', 'senha101'),
('77788899900', 'Isabela Santos', 'Rua J, 100', '00000000000', 'isabela@email.com', 'senha112');

-- ENTREGADOR
INSERT INTO ENTREGADOR (Cpf_Entregador, Nome, Tipo_Veiculo, Placa_Veiculo) VALUES
('55566677788', 'Carlos Oliveira', 'Moto', 'ABC1234'),
('99988877766', 'Fernanda Santos', 'Carro', 'XYZ5678'),
('12378945600', 'Rodrigo Almeida', 'Moto', 'DEF9012'),
('45612378900', 'Juliana Silva', 'Moto', 'GHI3456'),
('78945612300', 'Bruno Pereira', 'Carro', 'JKL7890'),
('10111213141', 'Amanda Souza', 'Moto', 'MNO1234'),
('15161718191', 'Felipe Oliveira', 'Carro', 'PQR5678'),
('20212223242', 'Camila Santos', 'Moto', 'STU9012'),
('25262728292', 'Lucas Almeida', 'Carro', 'VWX3456'),
('30313233343', 'Beatriz Pereira', 'Moto', 'BDY2590');

-- PEDIDO
INSERT INTO PEDIDO (Id_Pedido, Valor_Pago, Forma_Pagamento, Id_Restaurante, Cpf_Cliente, Cpf_Entregador, Data_Entrega, Frete) VALUES
(1, 75.00, 'Cartão', 1, '12345678901', '55566677788', '2024-07-20', 10.00),
(2, 40.00, 'Dinheiro', 2, '98765432109', '99988877766', '2024-07-20', 5.00),
(3, 62.00, 'Cartão', 3, '11122233344', '12378945600', '2024-07-21', 8.00),
(4, 35.00, 'Dinheiro', 1, '44455566677', '55566677788', '2024-07-21', 12.00),
(5, 50.00, 'Cartão', 2, '88899900011', '99988877766', '2024-07-22', 7.00),
(6, 80.00, 'Cartão', 3, '22233344455', '12378945600', '2024-07-22', 10.00),
(7, 45.00, 'Dinheiro', 1, '66677788899', '55566677788', '2024-07-23', 8.00),
(8, 60.00, 'Cartão', 2, '00011122233', '99988877766', '2024-07-23', 15.00),
(9, 90.00, 'Cartão', 3, '55566677799', '12378945600', '2024-07-24', 12.00),
(10, 30.00, 'Dinheiro', 1, '77788899900', '55566677788', '2024-07-24', 5.00);

-- TEM_NO_CARDAPIO
INSERT INTO TEM_NO_CARDAPIO (Id_Restaurante, Id_Refeicao, Quantidade_Disponivel) VALUES
(1, 1, 10),
(1, 4, 5),
(1, 5, 8),
(2, 2, 8),
(2, 6, 12),
(2, 11, 10),
(3, 3, 7),
(3, 7, 9),
(3, 12, 15),
(4, 4, 15),
(4, 8, 20),
(5, 5, 10),
(5, 9, 15),
(5, 14, 20);

-- FAZ_PARTE
INSERT INTO FAZ_PARTE (Id_Pedido, Id_Refeicao) VALUES
(1, 1),
(1, 4),
(2, 2),
(3, 3),
(4, 5),
(5, 6),
(6, 7),
(7, 8),
(8, 9),
(9, 1),
(9, 3),
(10, 5);

-- AVALIA
INSERT INTO AVALIA (Cpf_Cliente, Id_Restaurante, Nota, Descricao) VALUES
('12345678901', 1, 4, 'Ótimo churrasco!'),
('98765432109', 2, 5, 'Pizza deliciosa!'),
('11122233344', 3, 4, 'Sushi fresco e saboroso.'),
('44455566677', 1, 3, 'Bom, mas poderia ser melhor.'),
('88899900011', 2, 4, 'Gostei muito da massa!'),
('22233344455', 3, 5, 'O melhor sushi da cidade!'),
('66677788899', 1, 4, 'Atendimento excelente.'),
('00011122233', 2, 3, 'Preço um pouco alto.'),
('55566677799', 3, 4, 'Comida muito saborosa.'),
('77788899900', 1, 5, 'Recomendo o churrasco!');

select * from RESTAURANTE;
select * from REFEICAO;
select * from CATEGORIA;
select * from CLIENTE;
select * from ENTREGADOR;
select * from PEDIDO;
select * from TEM_NO_CARDAPIO;
select * from FAZ_PARTE;
select * from AVALIA;