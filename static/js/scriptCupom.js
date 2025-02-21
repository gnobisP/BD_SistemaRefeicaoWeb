async function Cadastrar_cupom(){
    const codigo = document.getElementById("codigo").value;
    const desconto = document.getElementById("desconto").value;
    

    console.log(codigo);
    console.log(desconto);


    await fetch('/salvarCupom',{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            codigo: codigo,desconto: desconto
        })
    }).then(response => {
        if(!response.ok){
            throw new Error("Erro ao cadastar cupom.");
        }
        return response.json();
    }).then(alert("Cupom cadastrado com sucesso!"))
    .catch(error => {
        console.error("Erro ao cadastrar Cupom: ", error);
    });

    window.location.href = "/CadastrarCupom";
}

async function obter_cupons() {
    try{
        const response = await fetch('/obterCupons');
        if(!response.ok){
            throw new Error("Erro ao carregar cupons: " + response.statusText);
        }
        cupons = await response.json();

        const codigo = document.getElementById("cupom");
        let correto = false;
        for(let cupom of cupons){
            if(cupom.codigo === codigo.value){
                correto = true;
                break;
            }
        }

        if(correto){
            alert("Cupom válido.");
        }
        else{
            alert("Cupom inválido. Tente usar outro cupom.");
        }
    } catch (error){
        console.error('Erro ao carregar os cupons:', error);
    }
}