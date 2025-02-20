async function checklogin() {
    try {
        
        const response = await fetch('/checklogin');
        
        const usuarios = await response.json();
        console.log('Dados recebidos:', usuarios);
        alert("❌ Usuário ou senha incorretos.");

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        /*let correto = false;
        
        for (let user of usuarios) {
            const str1 = JSON.stringify(user);
            if (str1.includes(email) && str1.includes(password)) {
                correto = true;
                break;
            } else {
                correto = false;
            }
        }

        if (correto) {
            window.location.href = "/AreaUsuario";
        } else {
            alert("❌ Usuário ou senha incorretos.");
        }*/

        

        

        let correto = false;
        for (let user of usuarios) {
            alert("User:" + user);
            const usuario = {email: email, password: password}
            console.log()
            //const str1 = JSON.stringify(user);
            if (usuario.email == user.email) {
                alert("Vai se fuder");
                correto = true;
                break;
            } else {
                alert("Vai se fuder 2");
                correto = false;
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



