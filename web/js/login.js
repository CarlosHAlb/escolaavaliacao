const API =
    "http://localhost:3000";

document.getElementById("formLogin").addEventListener("submit", async (e) => {

    e.preventDefault();

    const email =
        document.getElementById("email").value;

    const senha =
        document.getElementById("senha").value;

    const resposta =
        await fetch(
            API + "/professor/login",
            {

                method: "POST",

                headers: { "Content-Type": "application/json" },

                body: JSON.stringify({

                    email,
                    senha

                })

            });

    if (resposta.ok) {

        const professor =
            await resposta.json();

        sessionStorage.setItem(
            "professor",
            JSON.stringify(professor)
        );

        location.href = "turmas.html";

    } else {

        alert("Email ou senha inválidos");

    }

});

function abrirCadastro() {

    document
        .getElementById("modalProfessor")
        .classList
        .remove("oculto");
}

function fecharCadastro() {

    document
        .getElementById("modalProfessor")
        .classList
        .add("oculto");
}

async function cadastrarProfessor() {

    const nome =
        document.getElementById(
            "nomeProfessor"
        ).value;

    const email =
        document.getElementById(
            "emailProfessor"
        ).value;

    const senha =
        document.getElementById(
            "senhaProfessor"
        ).value;

    const res =
        await fetch(
            API + "/professor/cadastrar",
            {

                method: "POST",

                headers: { "Content-Type": "application/json" },

                body: JSON.stringify({

                    nome,
                    email,
                    senha
                })

            });

    if (res.ok) {

        alert(
            "Professor cadastrado!"
        );

        fecharCadastro();

    } else {

        alert(
            "Erro ao cadastrar professor"
        );

    }

}