from domain.models import NotaFiscal, Cliente

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
    
class LoginService:
    def __init__(self, db_adapter):
        self.db = db_adapter
    
    def check_login(self):
        query = "select Email, Senha from USUARIO"
        return self.db.fetch_all(query)