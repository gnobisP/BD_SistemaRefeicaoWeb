document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("Cadastro").addEventListener("submit", async function (event) {
        event.preventDefault(); // Impede o recarregamento da página

        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const telefone = document.getElementById("telefone").value;
        const endereco = document.getElementById("endereco").value;
        const cpf = document.getElementById("cpf").value;
        const senha = document.getElementById("senha").value;

        try {
            const response = await fetch("http://127.0.0.1:5000/Cadastro", {
                method: "POST",
                headers: {
                    "Content-Type": "dados/application/json"
                },
                body: JSON.stringify({ nome,email,telefone, endereco,cpf,senha })
            });

            const data = await response.json();

            if (response.ok) {
                alert("✅ " + data.message);
                // Aqui você pode redirecionar o usuário, salvar um token, etc.
            } else {
                alert("❌ " + data.message);
            }
        } catch (error) {
            console.error("Erro ao conectar ao servidor:", error);
            alert("Erro ao tentar fazer cadastro. Tente novamente.");
        }
    });
});