// script.js

let carrinho = JSON.parse(localStorage.getItem('../dados/carrinho')) || [];

function atualizarLocalStorage() {
    localStorage.setItem('../dados/carrinho', JSON.stringify(carrinho));
}

function adicionarAoCarrinho(refeicao) {
    const itemExistente = carrinho.find(item => item.Id_Refeicao === refeicao.Id_Refeicao);
    
    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({
            ...refeicao,
            quantidade: 1
        });
    }
    
    atualizarLocalStorage();
    atualizarContador();
    abrirCarrinho();
}

function removerItem(id) {
    carrinho = carrinho.filter(item => item.Id_Refeicao !== id);
    atualizarLocalStorage();
    atualizarContador();
    renderizarCarrinho();
}

function esvaziarCarrinho() {
    carrinho = [];
    atualizarLocalStorage();
    atualizarContador();
    renderizarCarrinho();
}

function calcularTotal() {
    return carrinho.reduce((total, item) => total + (item.Preco * item.quantidade), 0);
}

function atualizarContador() {
    document.getElementById('cart-count').textContent = carrinho.length;
}

function renderizarCarrinho() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    
    carrinho.forEach(item => {
        const itemHTML = `
            <div class="cart-item">
                <div class="row">
                    <div class="col-6">${item.Nome}</div>
                    <div class="col-2">R$ ${item.Preco.toFixed(2)}</div>
                    <div class="col-2">Qtd: ${item.quantidade}</div>
                    <div class="col-2">
                        <button class="btn btn-sm btn-danger" onclick="removerItem(${item.Id_Refeicao})">×</button>
                    </div>
                </div>
            </div>
        `;
        cartItems.innerHTML += itemHTML;
    });

    document.getElementById('cart-total').textContent = calcularTotal().toFixed(2);
}

function abrirCarrinho() {
    renderizarCarrinho();
    new bootstrap.Modal(document.getElementById('cartModal')).show();
}

async function finalizarCompra() {
    if (carrinho.length === 0) {
        alert('Carrinho vazio!');
        return;
    }

    const pagamento = document.querySelector('input[name="pagamento"]:checked').id;
    
    if (confirm(`Confirmar compra no valor de R$ ${calcularTotal().toFixed(2)} (${pagamento})?`)) {
        try {
            // Envia os dados do carrinho para o backend Flask
            const response = await fetch('http://127.0.0.1:5000/salvar-carrinho', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    itens: carrinho,
                    total: calcularTotal(),
                    pagamento: pagamento
                }),
            });

            if (response.ok) {
                alert('Compra finalizada com sucesso!');
                esvaziarCarrinho();
                document.getElementById('cartModal').classList.remove('show');
            } else {
                alert('Erro ao finalizar a compra.');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao conectar com o servidor.');
        }
    }
}

async function carregarDadosDoJson() {
    try {
        const response = await fetch('../dados/carrinho.json');
        const data = await response.json();
        data.forEach(item => adicionarAoCarrinho(item));
    } catch (error) {
        console.error('Erro ao carregar dados do JSON:', error);
    }
}

function continuaCompra() {
    window.location.href = 'refeicoes.html';
}

// Carregar dados do JSON quando a página for carregada
window.onload = carregarDadosDoJson;

let cartItems = [];

async function fetchCartItems() {
    try {
        const response = await fetch('dados/carrinho.json');
        cartItems = await response.json();
        renderCart();
    } catch (error) {
        console.error('Erro ao carregar os itens do carrinho:', error);
    }
}

function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    cartItems.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.Url_foto}" alt="${item.Nome}">
            <div>
                <h5>${item.Nome}</h5>
                <p>${item.Descricao}</p>
                <p>R$ ${item.Preco.toFixed(2)}</p>
            </div>
            <button class="btn btn-danger" onclick="removeItem(${index})">Remover</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
}

function removeItem(index) {
    cartItems.splice(index, 1);
    renderCart();
}

function emptyCart() {
    cartItems.length = 0;
    renderCart();
}

function finalizePurchase() {
    const paymentMethod = document.getElementById('paymentMethod').value;
    alert(`Compra finalizada com sucesso! Método de pagamento: ${paymentMethod}`);
    emptyCart();
}

document.addEventListener('DOMContentLoaded', fetchCartItems);