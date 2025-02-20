async function checklogin() {
    try {
        const response = await fetch('/checklogin');
        const usuarios = await response.json();
        console.log('Dados recebidos:', usuarios);

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        let correto = false;
        for (let user of usuarios) {
            console.log(password + "   " + user.senha);
            if (email === user.email && password === user.senha) {
                correto = true;
                break;
            }
        }

        if (correto) {
            window.location.href = "/AreaUsuario";
        } else {
            alert("❌ Usuário ou senha incorretos.");
        }
    } catch (error) {
        console.error('Erro ao carregar os dados do usuário:', error);
    }
}



