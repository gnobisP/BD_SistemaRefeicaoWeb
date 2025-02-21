async function checklogin() {
    try {
        const response = await fetch('/checklogin');
        const usuarios = await response.json();
        console.log('Dados recebidos:', usuarios);

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        let correto = false;
        let usuarioEncontrado = null;
        console.log(usuarios);
        for (let user of usuarios) {
            console.log(password + "   " + user.senha);
            if (email === user.email && password === user.senha) {
                correto = true;
                usuarioEncontrado = user; // Salva o usuário encontrado
                break;
            }
        }

        if (correto) {
            // Envia o usuário para o Flask para salvar
            const salvarResponse = await fetch('/salvaUsuarioAtual', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuarioEncontrado), // Envia o usuário encontrado
            });

            if (salvarResponse.ok) {
                console.log('Usuário salvo com sucesso no backend.');
                window.location.href = "/CadastrarCupom"; // Redireciona para a área do usuário
            } else {
                console.error('Erro ao salvar o usuário no backend.');
            }
        } else {
            alert("❌ Usuário ou senha incorretos.");
        }
    } catch (error) {
        console.error('Erro ao carregar os dados do usuário:', error);
    }
}