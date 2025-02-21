from flask import Flask, jsonify, request, render_template, abort
from adapters.database_adapter import DatabaseAdapter
from domain.services import NotaFiscalService, ClienteService, PedidoService, RefeicaoService, LoginService, CupomService
from domain.models import NotaFiscal, NotaFiscalItens, Produto, Cliente, Refeicao, Cupom, Usuario
from domain.services import NotaFiscalService, ClienteService, RefeicaoService, LoginService, CupomService, RestauranteService, AvaliacaoService
from domain.models import NotaFiscal, NotaFiscalItens, Produto, Cliente, Refeicao, Cupom, Restaurante, Avaliacao, Pedido, FazParte
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
cupom_service = CupomService(db_adapter)
usuarios_salvos = []
restaurante_service = RestauranteService(db_adapter)
avaliacao_service = AvaliacaoService(db_adapter)
pedido_service = PedidoService(db_adapter)
#------------------------Rotas para o front-end .html--------------------
@app.route('/')
def index0():
    return render_template('index.html')
@app.route('/AreaFuncionario')
def AreaFuncionario():
    return render_template('AreaFuncionario.html')

@app.route('/Avaliacao')
def avaliacao():
    return render_template('CadastrarAvaliacao.html')

@app.route('/index')
def index1():
    return render_template('index.html')
@app.route('/CadastrarCupom')
def CadastrarCupom():
    return render_template('CadastrarCupom.html')

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

@app.route('/CadastroRef')
def cadastroRefeicao():
    return render_template('CadastroRef.html')

#---------------Fim das rotas para o front-end .html-------------------------


#rota para adicionar refeicao no refeicoes.html
'''
@app.route('/api/refeicoes')
def get_refeicoes():
    with open('dados/refeicoes.json', 'r', encoding='utf-8') as f:
        refeicoes = json.load(f)
    return jsonify(refeicoes)
'''
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
    
usuario_logado = None

@app.route('/salvaUsuarioAtual', methods=['GET', 'POST'])  # Aceita GET e POST
def salva_usuario_atual():
    global usuario_logado  # Acessa a variável global

    if request.method == 'POST':
        # Lógica para salvar o usuário (POST)
        data = request.json  # Recebe os dados do usuário no formato JSON
        cpf = data.get('cpf')
        nome = data.get('nome')
        endereco = data.get('endereco')
        telefone = data.get('telefone')
        email = data.get('email')
        senha = data.get('senha')
        cliente_funcionario = data.get('cliente_funcionario')

        print(cpf)
        print(cpf)
        print(cpf)
        print(cpf)

        # Salva os dados do usuário logado na variável global
        usuario_logado = {
            "cpf": cpf,
            "nome": nome,
            "endereco": endereco,
            "telefone": telefone,
            "email": email,
            "senha": senha,
            "cliente_funcionario": cliente_funcionario
        }
        print(usuario_logado)

        return jsonify({"message": "Usuário salvo com sucesso", "usuario": usuario_logado}), 201

    elif request.method == 'GET':
        # Lógica para retornar o usuário salvo (GET)
        if usuario_logado:
            return jsonify({"usuario": usuario_logado}), 200
        else:
            return jsonify({"message": "Nenhum usuário logado"}), 404
#------------------------Rotas para o carrinho-------------------------
'''
ANTIGO
def load_items():
    if os.path.exists('dados/carrinho.json'):
        with open('dados/carrinho.json', 'r') as file:
            return json.load(file)
    return []
'''

def load_items():
    if os.path.exists('dados/carrinho.json'):
        with open('dados/carrinho.json', 'r') as file:
            return json.load(file)
    return []


def save_items(items):
    with open('dados/carrinho.json', 'w') as file:
        json.dump(items, file, indent=4)

@app.route('/api/itens', methods=['GET', 'POST'])
def items():
    if request.method == 'GET':
        # Carrega os itens iniciais do JSON
        data = load_items()
        items = [Refeicao(int(item['id_refeicao']), item['nome'], float(item['preco']),
                  item['categoria'], item['descricao'], item['url_foto']) for item in data]

        return jsonify([item.__dict__ for item in items])
    elif request.method == 'POST':
        # Adiciona um novo item
        new_item = request.json
        if not new_item:
            abort(400, description="Item inválido")
        
        items = load_items()
        items.append(new_item)
        save_items(items)
        
        return jsonify(new_item), 201

@app.route('/api/itens/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    items = load_items()
    
    # Verifica se o item existe
    if item_id < 0 or item_id >= len(items):
        abort(404, description="Item não encontrado")
    
    # Remove o item
    removed_item = items.pop(item_id)
    save_items(items)
    
    return jsonify(removed_item), 200

# rota para esvaziar carrinho
@app.route('/api/esvaziaCarrinho', methods=['POST'])
def esvaziar():
    try:
        with open('dados/carrinho.json', 'w', encoding='utf-8') as f:
            json.dump([], f)  # Write an empty list to clear the cart
        return jsonify({"message": "Carrinho esvaziado com sucesso!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
#------------------------FIM Rotas para o carrinho-------------------------

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
    
@app.route("/obterCupons", methods=['GET'])
def obter_cupons():
    try:
        cupons = cupom_service.obter_cupons()
        if not cupons:
            return jsonify({"message": "Nenhum cupom encontrado"}), 404
        return jsonify(cupons)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/salvarUsuario', methods=['POST'])
def salvar_usuario():
    data = request.json
    #cliente_data = data['cliente']
    cliente = Cliente(data['cpf'], data['nome'], data['endereco'],
                      data['email'], data['telefone'], data['senha'], data['cliente'])

    cliente_service.salvar_cliente(cliente)
    return jsonify({"message": "Cliente cadastrado com sucesso!"}), 201

@app.route('/salvarRefeicao', methods=['POST'])
def salvar_Refeicao():
    data = request.json
    #cliente_data = data['cliente']
    refeicao = Refeicao(data['id_refeicao'], data['nome'], data['preco'],
                      data['categoria'], data['descricao'], data['url_foto'])

@app.route('/salvarCupom', methods=['POST'])
def salvar_Cupom():
    data = request.json
    cupom = Cupom(data['codigo'], data['desconto'])

    print(cupom.Codigo)
    print(cupom.Desconto)
    
    

    cupom_service.salvar_Cupom(cupom)
    return jsonify({"message": "Cupom cadastrada com sucesso!"}), 201

@app.route('/salvarRestaurante', methods=['POST'])
def salvar_Restaurante():
    data = request.json
    restaurante = Restaurante(data['id_restaurante'], data['nome'], data['localizacao'],
                      data['inicio_funcionamento'], data['termino_funcionamento'], data['avaliacao'])
    print(restaurante.id_restaurante)
    print(restaurante.nome)
    print(restaurante.localizacao)
    print(restaurante.inicio_funcionamento)
    print(restaurante.termino_funcionamento)
    print(restaurante.avaliacao)
    restaurante_service.salvar_Restaurante(restaurante)
    return jsonify({"message": "Restaurante cadastrado com sucesso!"}), 201

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

@app.route('/salvarAval', methods=['POST'])
def salvar_avaliacao():

    data = request.json
    avaliacao = Avaliacao(data['Cpf_Cliente'], data['Id_Restaurante'], data['Nota'], data['Descricao'])
    print(avaliacao.cpf_cliente)
    print(avaliacao.id_restaurante)
    print(avaliacao.nota)
    print(avaliacao.descricao)
    avaliacao_service.salvar_avaliacao(avaliacao)
    return jsonify({"message": "Avaliação salva com sucesso!"}), 201


#função do edson, modificar para o nosso
@app.route('/salvarCompra', methods=['POST'])
def salvar_compra():
    
    
    print(usuario_logado['cpf'])
    
    data = request.json
    
    pedido = Pedido(115,data['total'], data['pagamento'], 
                    3, usuario_logado['cpf'],"2024-07-20")

    pedido_service.salvar_pedido(pedido)

    for each in data['itens']:
        faz_parte = FazParte(115 ,each['id_refeicao'])
        pedido_service.salva_faz_parte(faz_parte)

    
    return jsonify({"message": "Pedido salvo com sucesso!"}), 201
    
if __name__ == '__main__':
    app.run(debug=True)