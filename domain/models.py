from dataclasses import dataclass, field
from datetime import datetime

@dataclass
class Produto:
    id_produto: int
    descricao: str
    preco_venda: float

@dataclass
class NotaFiscalItens:
    produto: Produto
    quantidade: int

@dataclass
class NotaFiscal:
    id_nota_fiscal: int = None
    data_emissao: datetime = None
    itens: list[NotaFiscalItens] = field(default_factory=list)

@dataclass
class Cliente:
    cpf_cliente: str
    nome: str
    endereco: str
    email: str
    telefone: str
    senha: str