async function cadastrar_aval(){
    const cpf = document.getElementById("cpf").value;
    const idres = document.getElementById("id_res").value;
    const nota = document.getElementById("nota").value;
    const descricao = document.getElementById("descricao").value;

    console.log(cpf);
    console.log(idres);
    console.log(nota);
    console.log(descricao);

    await fetch('/salvarAval',{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            Cpf_Cliente: cpf, Id_Restaurante: idres, Nota: nota, Descricao: descricao
        })
    }).then(response => {
        if(!response.ok){
            throw new Error("Erro ao cadastar Avaliacao.");
        }
        return response.json();
    }).then(alert("Avaliacao cadastrado com sucesso!"))
    .catch(error => {
        console.error("Erro ao cadastrar Avaliacao: ", error);
    });

    window.location.href = "/AreaUsuario";
}