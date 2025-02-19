/*document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("CadastroUsu").addEventListener("submit", async function (event) {
        event.preventDefault(); // Impede o recarregamento da página

        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const telefone = document.getElementById("telefone").value;
        const endereco = document.getElementById("endereco").value;
        const cpf = document.getElementById("cpf").value;
        const senha = document.getElementById("senha").value;

        try {
            const response = await fetch("/salvarUsuario", {
                method: "POST",
                headers: {
                    "Content-Type": "dados/usuario/json"
                },
                body: JSON.stringify({ nome, email, telefone, endereco, cpf, senha })
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
});*/

async function faz_cadastro(){
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    const endereco = document.getElementById("endereco").value;
    const cpf = document.getElementById("cpf").value;
    const senha = document.getElementById("senha").value;

    console.log(nome);
    console.log(email);
    console.log(telefone);
    console.log(endereco);
    console.log(cpf);
    console.log(senha);

    await fetch('/salvarUsuario',{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome: nome, email: email, telefone: telefone,
            endereco: endereco, cpf: cpf, senha: senha, cliente: 'C'
        })
    }).then(response => {
        if(!response.ok){
            throw new Error("Erro ao cadastar usuário.");
        }
        return response.json();
    }).then(alert("Usuário cadastrado com sucesso!"))
    .catch(error => {
        console.error("Erro ao cadastrar usuário: ", error);
    });

    window.location.href = "/AreaUsuario";
}


