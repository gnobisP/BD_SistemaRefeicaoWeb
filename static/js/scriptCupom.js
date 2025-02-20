async function Cadastrar_cupom(){
    const codigo = document.getElementById("codigo").value;
    const desconto = document.getElementById("desconto").value;
    

    console.log(codigo);
    console.log(desconto);


    await fetch('/salvarRefeicao',{
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

    window.location.href = "/AreaUsuario";
}