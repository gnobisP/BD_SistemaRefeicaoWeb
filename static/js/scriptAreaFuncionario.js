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



// Função para "logout" (pode ser adaptada para remover tokens/sessões)
function logout() {
    alert("Você saiu da sua conta.");
    window.location.href = "index.html"; // Redireciona para a tela de login
}