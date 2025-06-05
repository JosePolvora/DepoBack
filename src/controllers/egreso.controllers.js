const dbdepo = require("../models/index.models");

async function createEgreso(req, res) {
    const dataEgresos = req.body;

    try {
        const crearEgreso = await dbdepo.Egreso.create({

            cantidad: dataEgresos.cantidad,
            fecha: dataEgresos.fecha,
            tipo: "Egreso",  // Este es un egreso
        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: "Egreso creado",
            body: crearEgreso,
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: error.message,
        });
    }
}





async function getEgresos(req, res) {
    try {
        const egresos = await dbdepo.Egreso.findAll();
        res.status(200).json({
            ok: true,
            status: 200,
            body: egresos,
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: error.message,
        });
    }
}

async function getEgresoById(req, res) {
    const id = req.params.id;

    try {
        const egresos = await dbdepo.Egreso.findOne({
            where: { egreso_id: id },
        });

        res.status(200).json({
            ok: true,
            status: 200,
            body: egresos,
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: error.message,
        });
    }
}

async function updateEgresoById(req, res) {
    const id = req.params.id;
    const dataEgresos = req.body;

    try {
        const actualizaEgreso = await dbdepo.Egreso.update(
            {
                cantidad: dataEgresos.cantidad,
                fecha: dataEgresos.fecha,
                tipo: "Egreso",  // Este es un egreso

            },
            {
                where: { egreso_id: id },
            }
        );

        res.status(200).json({
            ok: true,
            status: 200,
            body: actualizaEgreso,
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            status: 500,
            message: error.message,
        });
    }
}


async function deleteEgresoById(req, res) {
    const id = req.params.id;

    try {
        const eliminaEgreso = await dbdepo.Egreso.destroy({
            where: { egreso_id: id },
        });

        res.status(204).json({
            ok: true,
            status: 204,
            body: eliminaEgreso,
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: error.message,
        });
    }
}

module.exports = {
    createEgreso,
    getEgresos,
    getEgresoById,
    updateEgresoById,
    deleteEgresoById,
};
