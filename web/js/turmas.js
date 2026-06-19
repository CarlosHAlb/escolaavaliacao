const API = "http://localhost:3000";

const professor =
    JSON.parse(
        sessionStorage.getItem("professor")
    );

if (!professor) {
    location.href = "login.html";
}

carregarTurmas();

async function carregarTurmas() {

    const res = await fetch(API + `/turma/listar/professor/${professor.id}`);
    const turmas = await res.json();
    const tabela = document.getElementById("listaTurmas");

    tabela.innerHTML = "";

    turmas.forEach(t => {

        tabela.innerHTML += `

<tr>
<td>${t.id}</td>
<td>${t.nome}</td>
<td>
<button
onclick="verAtividades(${t.id})">
Ver
</button>
<button
onclick="excluirTurma(${t.id})">
Excluir
</button>
</td>
</tr>
`;

    });

}

async function cadastrarTurma() {

    const nome =
        document.getElementById(
            "nomeTurma"
        ).value;

    await fetch(API + "/turma/cadastrar", {

        method: "POST",

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({

            nome,
            professorId: professor.id
        })

    });

    fecharModal();
    carregarTurmas();

}

async function excluirTurma(id) {

    if (!confirm(
        "Deseja excluir essa turma?"
    )) return;

    const res = await fetch(API + `/turma/excluir/${id}`,
        {
            method: "DELETE"
        });

    if (!res.ok) {

        const erro =
            await res.json();

        alert(erro.mensagem);

    }

    carregarTurmas();

}

function verAtividades(id) {

    location.href = `atividades.html?id=${id}`;
}

function abrirModal() {

    document.getElementById("modal").classList.remove("oculto");
}

function fecharModal() {

    document.getElementById("modal").classList.add("oculto");

}

function logout() {
    sessionStorage.clear();
    location.href = "login.html";
}