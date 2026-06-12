const prisma = require("../data/prisma");

const cadastrar = async (req, res) => {
    try {
        const data = req.body;

        const reserva = await prisma.reserva.create({
            data: {
                hospede: data.hospede,
                dataEntrada: new Date(data.dataEntrada),
                dataSaida: new Date(data.dataSaida),
                quartoId: Number(data.quartoId)
            }
        });

        return res.status(201).json(reserva);

    } catch (error) {
        return res.status(400).json({
            erro: error.message
        });
    }
};

const listar = async (req, res) => {
    const lista = await prisma.reserva.findMany();

    res.json(lista).status(200).end();
};

const buscar = async (req, res) => {
    const { id } = req.params;
    
    const item = await prisma.reserva.findUnique({
        where: { id : Number(id) }
    });

    res.json(item).status(200).end();
};

const atualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const dados = req.body;

        const item = await prisma.reserva.update({
            where: {
                id: Number(id)
            },
            data: {
                hospede: dados.hospede,
                dataEntrada: new Date(dados.dataEntrada),
                dataSaida: new Date(dados.dataSaida),
                quartoId: Number(dados.quartoId)
            }
        });

        return res.status(200).json(item);

    } catch (error) {
        return res.status(400).json({
            erro: error.message
        });
    }
};

const excluir = async (req, res) => {
    const { id } = req.params;
    
    const item = await prisma.reserva.delete({
        where: { id : Number(id) }
    });

    res.json(item).status(200).end();
};

module.exports = {
    cadastrar,
    listar,
    buscar,
    atualizar,
    excluir
}
