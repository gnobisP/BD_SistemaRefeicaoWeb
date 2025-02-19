document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("login").addEventListener("submit", async function (event) {
        event.preventDefault(); // Impede o recarregamento da página

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch("http://127.0.0.1:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "dados/application/json"
                },
                body: JSON.stringify({ email, password })
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
            alert("Erro ao tentar fazer login. Tente novamente.");
        }
    });
});