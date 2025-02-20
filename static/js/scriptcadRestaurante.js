async function faz_cadastroRes(){
    const nome = document.getElementById("nome").value;
    const id = document.getElementById("idrestaurante").value;
    const local = document.getElementById("localizacao").value;
    const ini = document.getElementById("inicio_funcionamento").value;
    const fim = document.getElementById("termino_funcionamento").value;
    const aval = document.getElementById("avaliacao").value;

    console.log(nome);
    console.log(id);
    console.log(local);
    console.log(ini);
    console.log(fim);
    console.log(aval);

    await fetch('/salvarRestaurante',{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome: nome, id: id, local: local,
            ini: ini, fim: fim, aval: aval
        })
    }).then(response => {
        if(!response.ok){
            throw new Error("Erro ao cadastar restaurante.");
        }
        return response.json();
    }).then(alert("Restaurante cadastrado com sucesso!"))
    .catch(error => {
        console.error("Erro ao cadastrar restaurante: ", error);
    });

    window.location.href = "/AreaFuncionario";
}