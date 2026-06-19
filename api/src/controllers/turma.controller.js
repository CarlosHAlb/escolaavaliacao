const prisma = require("../data/prisma");

const cadastrar = async (req, res) => {
    const data = req.body;

    const item = await prisma.turma.create({
        data
    });

    res.status(201).json(item);
};

const listar = async (req, res) => {
    const lista = await prisma.turma.findMany({
    include: {
        professor: true
    }
});
    res.json(lista).status(200).end();
};

const buscar = async (req, res) => {
    const { id } = req.params;
    
    const item = await prisma.turma.findUnique({
    where: {
        id: Number(id)
    },
    include: {
        atividade: true,
        professor: true
    }
});

    res.json(item).status(200).end();
};

const atualizar = async (req, res) => {
    const { id } = req.params;
    const dados = req.body;
    
    const item = await prisma.turma.update({
        where: { id : Number(id) },
        data: dados
    });

    res.json(item).status(200).end();
};

const excluir = async (req, res) => {

    const { id } = req.params;

    const atividades = await prisma.atividade.findMany({
        where: {
            turmaId: Number(id)
        }
    });

    if (atividades.length > 0) {

        return res.status(400).json({
            mensagem:
            "Você não pode excluir uma turma com atividades cadastradas"
        });

    }

    const item = await prisma.turma.delete({
        where: {
            id: Number(id)
        }
    });

    res.status(200).json(item);
};

const listarPorProfessor = async (req, res) => {

    const { professorId } = req.params;

    const lista = await prisma.turma.findMany({
        where: {
            professorId: Number(professorId)
        }
    });

    res.status(200).json(lista);
};

module.exports = {
    cadastrar,
    listar,
    buscar,
    atualizar,
    excluir,
    listarPorProfessor
}
