from domain.models import NotaFiscal, Cliente, Refeicao, Cupom, Restaurante, Avaliacao, Pedido, FazParte

class NotaFiscalService:
    def __init__(self, db_adapter):
        self.db = db_adapter
    
    def obter_produtos(self):
        query = "SELECT id_produto, descricao, preco_venda FROM produto"
        return self.db.fetch_all(query)

    def salvar_nota_fiscal(self, nota_fiscal: NotaFiscal):
        # Salvar nota fiscal
        query_nota = "INSERT INTO nota_fiscal (id_nota_fiscal) VALUES (default) RETURNING id_nota_fiscal"
        nota_id = self.db.execute(query_nota)

        # Salvar itens da nota fiscal
        seq = 0
        for item in nota_fiscal.itens:
            query_item = """
            INSERT INTO nota_fiscal_itens (id_nota_fiscal, seq_item, id_produto, quantidade,
            preco_venda)
            VALUES (%s, %s, %s, %s, %s)
            """
            seq = seq+1
            self.db.execute(query_item, (nota_id, seq, item.produto.id_produto, item.quantidade,
            item.produto.preco_venda))

    def obter_vendas(self):
        query = """
        SELECT A.id_nota_fiscal, C.descricao, B.quantidade, B.preco_venda
        FROM NOTA_FISCAL A JOIN NOTA_FISCAL_ITENS B ON B.id_nota_fiscal = A.id_nota_fiscal
        JOIN PRODUTO C ON C.id_produto = B.id_produto
        ORDER BY A.id_nota_fiscal, B.seq_item
        """
        return self.db.fetch_all(query)
    
class ClienteService:
    def __init__(self, db_adapter):
        self.db = db_adapter

    def salvar_cliente(self, cliente: Cliente):
        query = "insert into USUARIO (Cpf, Nome, Endereco, Telefone, Email, Senha, Cliente_Funcionario) values (%s, %s, %s, %s, %s, %s, %s)"
        self.db.execute(query, (cliente.cpf_cliente, cliente.nome, cliente.endereco, cliente.telefone, cliente.email, cliente.senha, cliente.cliente))

class RefeicaoService:
    def __init__(self, db_adapter):
        self.db = db_adapter

    def obter_refeicoes(self):
        query = "select * from REFEICAO"

        return self.db.fetch_all(query)
    
    def salvar_Refeicao(self, refeicao: Refeicao):
        query = "insert into REFEICAO (Id_Refeicao, Nome, Preco, Categoria, Descricao, Url_foto) values (%s, %s, %s, %s, %s, %s)"
        self.db.execute(query, (refeicao.id_refeicao, refeicao.nome, refeicao.preco, refeicao.categoria, refeicao.descricao, refeicao.url_foto))
    
class LoginService:
    def __init__(self, db_adapter):
        self.db = db_adapter
    
    def check_login(self):
        query = "select * from USUARIO"
        return self.db.fetch_all(query)
    
    def get_user(self):
        query = "select * from USUARIO"
        return self.db.fetch_all(query)
    
class CupomService:
    def __init__(self, db_adapter):
        self.db = db_adapter

    def salvar_Cupom(self, cupom: Cupom):
        query = "insert into CUPOM (Codigo, Valor_Desconto) values (%s, %s)"
        self.db.execute(query, (cupom.Codigo, cupom.Desconto))

    def obter_cupons(self):
        query = "select * from CUPOM"
        return self.db.fetch_all(query)

class CarrinhoService:    
    def salvar_Carrinho(self, refeicao: Refeicao):
        query = "insert into REFEICAO (Id_Refeicao, Nome, Preco, Categoria, Descricao, Url_foto) values (%s, %s, %s, %s, %s, %s)"
        self.db.execute(query, (refeicao.id_refeicao, refeicao.nome, refeicao.preco, refeicao.categoria, refeicao.descricao, refeicao.url_foto))
    
class RestauranteService:
    def __init__(self, db_adapter):
        self.db = db_adapter

    def obter_restaurantes(self):
        query = "select * from RESTAURANTE"
        return self.db.fetch_all(query)

    def salvar_Restaurante(self, restaurante: Restaurante):
        query = "insert into RESTAURANTE (Id_Restaurante, Nome, Localizacao, Inicio_Funcionamento, Termino_Funcionamento, Avaliacao) values (%s, %s, %s, %s, %s, %s)"
        self.db.execute(query, (restaurante.Id_restaurante, restaurante.Nome, restaurante.Localizacao, restaurante.Inicio_Funcionamento, restaurante.Termino_Funcionamento, restaurante.Avaliacao))

class AvaliacaoService:
    def __init__(self, db_adapter):
        self.db = db_adapter

    def salvar_avaliacao(self, avaliacao: Avaliacao):
        query = "insert into AVALIA (Cpf_Cliente, Id_Restaurante, Nota, Descricao) values (%s, %s, %s, %s)"
        self.db.execute(query, (avaliacao.cpf_cliente, avaliacao.id_restaurante, avaliacao.nota, avaliacao.descricao))

    def obter_avaliacoes(self):
        query = "select * from AVALIA"
        return self.db.fetch_all(query)

class PedidoService:
    def __init__(self, db_adapter):
        self.db = db_adapter

    def salvar_pedido(self, pedido: Pedido):
        query = "INSERT INTO PEDIDO (Valor_Pago, Forma_Pagamento, Id_Restaurante, Cpf_Cliente, Data_Pedido, Codigo_Cupom) VALUES (%s, %s, %s, %s, current_date, %s)"
        self.db.execute(query, (pedido.valor_pago, pedido.forma_pagamento, pedido.id_restaurante, pedido.cpf_cliente,4))

    def obter_pedidos_cliente(self, cpf: str):
        query = "SELECT P.Id_Pedido, P.Valor_Pago, P.Forma_Pagamento, R.Nome, P.Data_Pedido from PEDIDO P join RESTAURANTE R on P.Id_Restaurante = R.Id_Restaurante where P.Cpf_Cliente = {cpf}"
        return self.db.fetch_all(query)
    
    def salva_faz_parte(self, fazparte: FazParte):
        query = "INSERT INTO FAZ_PARTE (Id_Pedido, Id_Refeicao) VALUES (%s, %s)"
        self.db.execute(query, (fazparte.id_pedido, fazparte.id_refeicao))


        
