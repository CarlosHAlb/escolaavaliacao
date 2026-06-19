const API =
"http://localhost:3000";


const params =
new URLSearchParams(
window.location.search
);


const turmaId =
params.get("id");



carregarAtividades();





async function carregarAtividades(){


    const res =
    await fetch(
        API +
        `/atividade/listar/turma/${turmaId}`
    );


    const lista =
    await res.json();



    const tabela =
    document.getElementById(
        "listaAtividades"
    );



    tabela.innerHTML = "";



    lista.forEach(a=>{


tabela.innerHTML += `

<tr>

<td>${a.id}</td>


<td>
${a.descricao}
</td>


<td>

${new Date(a.fim)
.toLocaleDateString()}

</td>


<td>

<button onclick="concluirAtividade(${a.id})">

${a.concluida ? "Concluída" : "Concluir"}

</button>


<button onclick="excluirAtividade(${a.id})">

Excluir

</button>


</td>


</tr>

`;

});


}







async function cadastrarAtividade(){


    const descricao =
    document.getElementById(
        "descricao"
    ).value;



    const fimInput =
    document.getElementById(
        "fim"
    ).value;




    if(!descricao || !fimInput){


        alert(
            "Preencha todos os campos"
        );

        return;

    }




    const fim =
    new Date(fimInput).toISOString();





    const resposta =
    await fetch(
        API + "/atividade/cadastrar",
        {


        method:"POST",


        headers:{

            "Content-Type":"application/json"

        },



        body:JSON.stringify({

            descricao: descricao,

            turmaId: Number(turmaId),

            fim: fim

        })


    });






    if(resposta.ok){


        alert(
            "Atividade cadastrada com sucesso!"
        );



        fecharModal();



        document.getElementById(
            "descricao"
        ).value = "";



        document.getElementById(
            "fim"
        ).value = "";



        carregarAtividades();



    }else{


        const erro =
        await resposta.json();



        console.log(erro);



        alert(
            "Erro ao cadastrar atividade"
        );

    }


}







function abrirModal(){


    document
    .getElementById("modal")
    .classList
    .remove("oculto");


}







function fecharModal(){


    document
    .getElementById("modal")
    .classList
    .add("oculto");


}




async function excluirAtividade(id){


if(!confirm("Deseja excluir essa atividade?"))
return;



const res =
await fetch(
API+`/atividade/excluir/${id}`,
{
method:"DELETE"
}
);



if(res.ok){

alert("Atividade excluída");

carregarAtividades();

}else{

alert("Erro ao excluir");

}


}





async function concluirAtividade(id){


const res =
await fetch(
API+`/atividade/atualizar/${id}`,
{


method:"PUT",


headers:{
"Content-Type":"application/json"
},


body:JSON.stringify({

concluida:true

})


});



if(res.ok){

alert("Atividade concluída!");

carregarAtividades();

}


}



function logout(){


    sessionStorage.clear();


    location.href =
    "login.html";


}