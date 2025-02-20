let carrinho = [];
let precoTotal = 0

// Função para adicionar um item ao carrinho
async function adicionarItem(item) {
    try {
        const response = await fetch('/api/itens', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
        if (response.ok) {
            carrinho.push(item); // Adiciona o item localmente
            renderizarCarrinho(); // Renderiza o carrinho
            alert('Item adicionado com sucesso!');
        } else {
            throw new Error('Erro ao adicionar o item.');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao adicionar o item.');
    }
}

// Função para remover um item do carrinho
async function removerItem(id) {
    try {
        const response = await fetch(`/api/itens/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            carrinho = carrinho.filter(pedido => pedido.id_Pedido !== id); // Remove o item localmente
            renderizarCarrinho(); // Renderiza o carrinho
            alert('Item removido com sucesso!');
        } else {
            throw new Error('Erro ao remover o item.');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao remover o item.');
    }
}

// Função para esvaziar o carrinho
async function esvaziarCarrinho() {
    try {
        const response = await fetch('/api/esvaziaCarrinho', {
            method: 'POST'
        });
        if (response.ok) {
            carrinho = []; // Limpa o carrinho localmente
            renderizarCarrinho(); // Renderiza o carrinho
            alert('Carrinho esvaziado com sucesso!');
        } else {
            throw new Error('Erro ao esvaziar o carrinho.');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao esvaziar o carrinho.');
    }
}

// Função para calcular o total do carrinho
function calcularTotal() {
    return carrinho.reduce((total, item) => total + (item.Preco * item.quantidade), 0);
}

// Função para atualizar o contador de itens no carrinho
function atualizarContador() {
    document.getElementById('cart-count').textContent = carrinho.length;
}

function renderizarCarrinho() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    precoTotal = 0; // Reset precoTotal before recalculating

    carrinho.forEach(item => {
        const itemHTML = `
            <div class="cart-item">
                <div class="row">
                    <img src="${item.url_foto}" alt="${item.nome}">
                    <div class="col-6">${item.nome}</div>
                    <div class="col-2">R$ ${item.preco}</div>
                    <div class="col-2">
                        <button class="btn btn-sm btn-danger" onclick="removerItem(${item.id_refeicao})">×</button>
                    </div>
                </div>

            </div>
        `;
        cartItems.innerHTML += itemHTML;
        precoTotal += item.preco; // Convert to number before adding
    });

    const precoTotalHTML = `
    <div>
        <p>Preço total: R$ ${precoTotal}</p>
    </div>`;
    cartItems.innerHTML += precoTotalHTML;
}

// Função para abrir o modal do carrinho
function abrirCarrinho() {
    renderizarCarrinho(); // Renderiza o carrinho antes de abrir o modal
    new bootstrap.Modal(document.getElementById('cartModal')).show(); // Abre o modal
}

// Função para finalizar a compra
async function finalizarCompra() {
    const pagamento = document.getElementById('paymentMethod').value; // Obtém o método de pagamento

    if (carrinho.length === 0) {
        alert('Carrinho vazio!'); // Alerta se o carrinho estiver vazio
        return;
    }

    // Confirmação da compra
    if (confirm(`Confirmar compra no valor de R$ ${precoTotal} (${pagamento})?`)) {
        try {
            // Cria um objeto com os dados da compra
            const dadosCompra = {
                itens: carrinho,
                total: precoTotal,
                pagamento: pagamento,
                data: new Date().toLocaleString() // Adiciona a data da compra
            };

            // Converte o objeto para JSON
            const json = JSON.stringify(dadosCompra, null, 2);

            // Envia o JSON para o servidor para salvar na pasta /dados
            const response = await fetch('/dados/salvarCompra', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: json
            });

            if (response.ok) {
                defesvaziar(); // Esvazia o carrinho após a compra
            } else {
                throw new Error('Erro ao salvar o arquivo JSON.');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao finalizar a compra.');
        }
    }
    window.location.href = "/AreaUsuario"
}

// Função para continuar comprando (redireciona para a página de refeições)
function continuaCompra() {
    window.location.href = "/cardapio"
}


async function carregarItens() {
    try {
        const response = await fetch('/api/itens');

        // Verifica se a resposta é OK (status 200-299)
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Dados recebidos:', data);

        // Verifica se os dados são um array
        if (!Array.isArray(data)) {
            throw new Error('Dados inválidos: esperado um array de pedidos');
        }

        // Atribui os dados diretamente ao carrinho
        carrinho = data;


        // Renderiza o carrinho
        renderizarCarrinho();

    } catch (error) {
        console.error('Erro ao carregar os itens:', error);
        alert('Erro ao carregar os itens. Verifique o console para mais detalhes.');
    }
}
// Carrega os itens quando a página é carregada
window.onload = carregarItens;