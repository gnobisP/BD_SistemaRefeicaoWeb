const userData = {
    nome: "João da Silva",
    email: "joao@email.com",
    telefone: "(31) 98765-4321",
    endereco: "Rua das Flores, 123",
    cpf: "12345678901"
};

// Preenchendo os campos com os dados do usuário
document.getElementById("user-name").innerText = userData.nome;
document.getElementById("nome").innerText = userData.nome;
document.getElementById("email").innerText = userData.email;
document.getElementById("telefone").innerText = userData.telefone;
document.getElementById("endereco").innerText = userData.endereco;
document.getElementById("cpf").innerText = userData.cpf;

// JSON de pedidos
const pedidos = [
    {
        "Id_Pedido": 1,
        "Valor_Pago": 75.00,
        "Forma_Pagamento": "Cartão",
        "Id_Restaurante": 1,
        "Cpf_Cliente": "12345678901",
        "Cpf_Entregador": "55566677788",
        "Data_Entrega": "2024-07-20",
        "Frete": 10.00
    },
    {
        "Id_Pedido": 2,
        "Valor_Pago": 40.00,
        "Forma_Pagamento": "Dinheiro",
        "Id_Restaurante": 2,
        "Cpf_Cliente": "98765432109",
        "Cpf_Entregador": "99988877766",
        "Data_Entrega": "2024-07-20",
        "Frete": 5.00
    }
];

// Filtrando os pedidos do usuário
const pedidosDoUsuario = pedidos.filter(pedido => pedido.Cpf_Cliente === userData.cpf);

// Exibindo os pedidos no HTML
const pedidosContainer = document.getElementById("pedidos-container");

pedidosDoUsuario.forEach(pedido => {
    const pedidoElement = document.createElement("div");
    pedidoElement.classList.add("pedido");

    pedidoElement.innerHTML = `
        <p><strong>ID do Pedido:</strong> ${pedido.Id_Pedido}</p>
        <p><strong>Valor Pago:</strong> R$ ${pedido.Valor_Pago.toFixed(2)}</p>
        <p><strong>Forma de Pagamento:</strong> ${pedido.Forma_Pagamento}</p>
        <p><strong>Data de Entrega:</strong> ${pedido.Data_Entrega}</p>
        <p><strong>Frete:</strong> R$ ${pedido.Frete.toFixed(2)}</p>
        <hr>
    `;

    pedidosContainer.appendChild(pedidoElement);
});

// Função para "logout" (pode ser adaptada para remover tokens/sessões)
function logout() {
    alert("Você saiu da sua conta.");
    window.location.href = "index.html"; // Redireciona para a tela de login
}