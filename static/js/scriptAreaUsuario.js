document.addEventListener("DOMContentLoaded", function () {
    fetch("/api/usuario")
        .then(response => response.json())
        .then(usuario_logado => {
            document.getElementById("user-name").innerText = usuario_logado.nome;
            document.getElementById("nome").innerText = usuario_logado.nome;
            document.getElementById("email").innerText = usuario_logado.email;
            document.getElementById("telefone").innerText = usuario_logado.telefone;
            document.getElementById("endereco").innerText = usuario_logado.endereco;
            document.getElementById("cpf").innerText = usuario_logado.cpf;

            // JSON de pedidos (simulado)
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
            const pedidosDoUsuario = pedidos.filter(pedido => pedido.Cpf_Cliente === usuario_logado.cpf);

            // Exibindo os pedidos no HTML
            const pedidosContainer = document.getElementById("pedidos-container");
            pedidosContainer.innerHTML = ""; // Limpa antes de adicionar novos

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
        })
        .catch(error => console.error("Erro ao carregar os dados do usuário:", error));
});

// Função para "logout"
function logout() {
    alert("Você saiu da sua conta.");
    window.location.href = "index.html"; // Redireciona para a tela de login
}
