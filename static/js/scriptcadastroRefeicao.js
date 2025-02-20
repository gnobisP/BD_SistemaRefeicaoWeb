async function faz_cadastroR(){
    const nome = document.getElementById("nome").value;
    const preco = document.getElementById("preco").value;
    const descricao = document.getElementById("descricao").value;
    const idrefeicao = document.getElementById("id_refeicao").value;
    const categoria = document.getElementById("categoria").value;
    const idfoto = document.getElementById("id_foto").value;

    console.log(nome);
    console.log(preco);
    console.log(descricao);
    console.log(idrefeicao);
    console.log(categoria);
    console.log(idfoto);

    await fetch('/salvarRefeicao',{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome: nome, preco: preco, descricao: descricao,
            idrefeicao: idrefeicao, categoria: categoria, idfoto: idfoto, refeicao: 'R'
        })
    }).then(response => {
        if(!response.ok){
            throw new Error("Erro ao cadastar Refeicao.");
        }
        return response.json();
    }).then(alert("Refeicao cadastrado com sucesso!"))
    .catch(error => {
        console.error("Erro ao cadastrar Refeicao: ", error);
    });

    window.location.href = "/cardapio";
}