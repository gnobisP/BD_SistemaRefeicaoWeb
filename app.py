from flask import Flask, jsonify, request
from adapters.database_adapter import DatabaseAdapter
from domain.services import NotaFiscalService, ClienteService
from domain.models import NotaFiscal, NotaFiscalItens, Produto, Cliente
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

# Configuração do banco de dados // user/password
DATABASE_URL = "postgresql://postgres:postgres@localhost/trabalhobd"
db_adapter = DatabaseAdapter(DATABASE_URL)
nota_service = NotaFiscalService(db_adapter)
cliente_service = ClienteService(db_adapter)


@app.route('/obterProdutos', methods=['GET'])
def obter_produtos():
    try:
        produtos = nota_service.obter_produtos()
        if not produtos:
            return jsonify({"message": "Nenhum produto encontrado."}), 404
        return jsonify(produtos)
    except Exception as e:
        return jsonify({"error": str(e)}), 500



@app.route('/salvarUsuario', methods=['POST'])
def salvar_usuario():
    data = request.json
    cliente_data = data['cliente']
    cliente = Cliente()

    cliente.cpf_cliente = cliente_data['cpf']
    cliente.nome = cliente_data['nome']
    cliente.endereco = cliente_data['endereco']
    cliente.email = cliente_data['email']
    cliente.telefone = cliente_data['telefone']
    cliente.senha = cliente_data['senha']

    cliente_service.salvar_cliente()
    return jsonify({"message": "Cliente cadastrado com sucesso!"}), 201



@app.route('/salvarNotaFiscal', methods=['POST'])
def salvar_nota():
    data = request.json
    itens_data = data['itens']
    nota_fiscal = NotaFiscal()
    itens = []
    
    # Itera sobre cada item em itens_data
    for item in itens_data:
        # Cria um novo objeto Produto com os dados de produto
        produto = Produto(item['produtoId'], descricao=None,
        preco_venda=item['precoVenda'])

        # Cria um novo objeto ItemNota com os dados do item
        item_nota = NotaFiscalItens(
            produto=produto,
            quantidade=item['qtdeComprada']
        )

        # Adiciona o item criado à lista de itens
        itens.append(item_nota)

    # Agora que todos os itens foram criados, adicionamos à lista de itens da nota fiscal
    nota_fiscal.itens.extend(itens)

    # Salva a nota fiscal e seus itens
    nota_id = nota_service.salvar_nota_fiscal(nota_fiscal)
    
    return jsonify({"message": "Nota fiscal salva com sucesso!", "nota_id": nota_id}), 201

@app.route('/obterVendas', methods=['GET'])
def obter_vendas():
    try:
        vendas = nota_service.obter_vendas()
        if not vendas:
            return jsonify({"message": "Nenhuma venda encontrada."}), 404
        return jsonify(vendas)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)