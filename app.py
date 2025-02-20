from flask import Flask, jsonify, request, render_template
from adapters.database_adapter import DatabaseAdapter
from domain.services import NotaFiscalService, ClienteService, RefeicaoService, LoginService
from domain.models import NotaFiscal, NotaFiscalItens, Produto, Cliente
from flask_cors import CORS
import os
import json

app = Flask(__name__)

CORS(app)

# Configuração do banco de dados // user/password
DATABASE_URL = "postgresql://postgres:postgres@localhost/trabalhobd"
db_adapter = DatabaseAdapter(DATABASE_URL)
nota_service = NotaFiscalService(db_adapter)
cliente_service = ClienteService(db_adapter)
refeicao_service = RefeicaoService(db_adapter)
login_service = LoginService(db_adapter)

#------------------------Rotas para o front-end .html--------------------
@app.route('/')
def index0():
    return render_template('index.html')

@app.route('/index')
def index1():
    return render_template('index.html')

@app.route('/loginUsu')
def loginUsu():
    return render_template('loginUsu.html')

@app.route('/loginAdm')
def loginAdm():
    return render_template('loginAdm.html')

@app.route('/AreaUsuario')
def areauser():
    return render_template('AreaUsuario.html')

@app.route('/alterarDadosUso')
def alterardadosuso():
    return render_template('alterarDadosUso.html')

@app.route('/carrinho')
def carrinho():
    return render_template('carrinho.html')
'''
@app.rout('/index')
def index():
    return render_template('index.html')
'''
@app.route('/cadastroUsu')
def cadastroUsu():
    return render_template('CadastroUsu.html')

@app.route('/cardapio')
def cardapio():
    return render_template('refeicoes.html')

#---------------Fim das rotas para o front-end .html-------------------------


#rota para adicionar refeicao no refeicoes.html
@app.route('/api/refeicoes')
def get_refeicoes():
    with open('dados/refeicoes.json', 'r', encoding='utf-8') as f:
        refeicoes = json.load(f)
    return jsonify(refeicoes)

#rota para adicionar usuario no jss de login
@app.route('/checklogin')
def check_login():
    try:
        usuario = login_service.check_login()
        if not usuario:
            return jsonify({"message": "Usuário não encontrado"}), 404
        return jsonify(usuario)
    except Exception as e:
        return jsonify({"error": str(e)}, 500)

#rota para adicionar itens no carrinho.html
@app.route('/api/itens')
def getiItens():
    with open('dados/carrinho.json', 'r', encoding='utf-8') as f:
        pedidos = json.load(f)
    return jsonify(pedidos)

@app.route('/obterProdutos', methods=['GET'])
def obter_produtos():
    try:
        produtos = nota_service.obter_produtos()
        if not produtos:
            return jsonify({"message": "Nenhum produto encontrado."}), 404
        return jsonify(produtos)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/obterRefeicoes", methods=['GET'])
def obter_refeicoes():
    try:
        refeicoes = refeicao_service.obter_refeicoes()
        if not refeicoes:
            return jsonify({"message": "Nenhuma refeicao encontrada."}), 404
        return jsonify(refeicoes)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/salvarUsuario', methods=['POST'])
def salvar_usuario():
    data = request.json
    #cliente_data = data['cliente']
    cliente = Cliente(data['cpf'], data['nome'], data['endereco'],
                      data['email'], data['telefone'], data['senha'], data['cliente'])

    print(cliente.cpf_cliente)
    print(cliente.nome)
    print(cliente.endereco)
    print(cliente.email)
    print(cliente.telefone)
    print(cliente.senha)
    print(cliente.cliente)

    cliente_service.salvar_cliente(cliente)
    return jsonify({"message": "Cliente cadastrado com sucesso!"}), 201

@app.route('/salvarRefeicao', methods=['POST'])
def salvar_Refeicao():
    data = request.json
    #cliente_data = data['cliente']
    refeicao = Refeicao(data['idrefeicao'], data['nome'], data['preco'],
                      data['categoria'], data['descricao'], data['idfoto'], data['refeicao'])

    print(refeicao.idrefeicao)
    print(refeicao.nome)   
    print(refeicao.preco)
    print(refeicao.categoria)
    print(refeicao.descricao)
    print(refeicao.idfoto)
    print(refeicao.refeicao) 
    

    refeicao_service.salvar_Refeicao(refeicao)
    return jsonify({"message": "Refeicao cadastrada com sucesso!"}), 201

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

@app.route('/dados/salvarCompra', methods=['POST'])
def salvar_compra():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No data provided"}), 400

        # Define the path to save the JSON file
        save_path = os.path.join(os.getcwd(), 'dados', 'compra.json')

        # Save the JSON data to the file
        with open(save_path, 'w') as json_file:
            json.dump(data, json_file, indent=2)

        return jsonify({"message": "Compra salva com sucesso!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)