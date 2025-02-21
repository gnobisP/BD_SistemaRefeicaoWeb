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
async function obtemPedidosCliente(){
    // Filtrando os pedidos do usuário
try{
    const response = await fetch('/obterPedidosCliente');
    if(!response.ok){
        throw new Error("Erro ao carregar pedidos: " + response.statusText);
    }
    const pedidosDoUsuario = await response.json();

    // Exibindo os pedidos no HTML
    const pedidosContainer = document.getElementById("pedidos-container");

    pedidosDoUsuario.forEach(pedido => {
        const pedidoElement = document.createElement("div");
        pedidoElement.classList.add("pedido");
        alert(pedido.Id_Pedido);
        alert(pedido.Valor_Pago);
        alert(pedido.Forma_Pagamento);

        pedidoElement.innerHTML = `
            <p><strong>ID do Pedido:</strong> ${pedido.Id_Pedido}</p>
            <p><strong>Valor Pago:</strong> R$ ${pedido.Valor_Pago.toFixed(2)}</p>
            <p><strong>Forma de Pagamento:</strong> ${pedido.Forma_Pagamento}</p>
            <p><strong>Nome do restaurante:</strong> ${pedido.Nome}</p>
            <p><strong>Data em que foi feito:</strong> ${pedido.Data_Pedido}</p>
            <hr>
        `;
        pedidosContainer.appendChild(pedidoElement);
    });
} catch (error){
    console.error('Erro ao carregar os pedidos', error);
}
}



// Função para "logout" (pode ser adaptada para remover tokens/sessões)
function logout() {
    alert("Você saiu da sua conta.");
    window.location.href = "index.html"; // Redireciona para a tela de login
}
