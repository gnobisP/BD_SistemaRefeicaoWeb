from dataclasses import dataclass, field
from datetime import datetime
from datetime import time

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
    cliente: str

@dataclass
class Refeicao:
    id_refeicao: int
    nome: str
    preco: float
    categoria: str
    descricao: str
    url_foto: str

@dataclass
class Cupom:
    Codigo: int
    Desconto: float

@dataclass
class Restaurante:
    id_restaurante: int
    nome: str
    localizacao: str
    inicio_funcionamento: time
    termino_funcionamento: time
    avaliacao: float