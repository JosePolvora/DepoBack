const dbdepo = require("../models/index.models");

async function createIngreso(req, res) {
    const dataIngresos = req.body;

    try {
        const crearIngreso = await dbdepo.Ingreso.create({
            cantidad: dataIngresos.cantidad,
            fecha: dataIngresos.fecha,
            plano_id: dataIngresos.plano_id,
            ubicacion_id: dataIngresos.ubicacion_id,
            planoxubicacion_id: dataIngresos.planoxubicacion_id
        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: "Ingreso creado",
            body: crearIngreso,
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: error.message,
        });
    }
}


// Para usar historial automatico

// async function createIngreso(req, res) {
//     const dataIngresos = req.body;

//     try {
//         const crearIngreso = await dbdepo.Ingreso.create({
//             cantidad: dataIngresos.cantidad,
//             fecha: dataIngresos.fecha,
//             plano_id: dataIngresos.plano_id,
//             ubicacion_id: dataIngresos.ubicacion_id,
//             planoxubicacion_id: dataIngresos.planoxubicacion_id
//         });

//         // 👉 Crear el historial asociado al ingreso
//         await dbdepo.Historial.create({
//             fecha: dataIngresos.fecha || new Date(), // Usar la misma fecha o fecha actual
//             usuario_id: dataIngresos.usuario_id,     // Asegurate de enviar esto desde el front
//             plano_id: dataIngresos.plano_id,
//             ubicacion_id: dataIngresos.ubicacion_id,
//             ingreso_id: crearIngreso.ingreso_id
//         });

//         res.status(201).json({
//             ok: true,
//             status: 201,
//             message: "Ingreso y historial creados",
//             body: crearIngreso,
//         });

//     } catch (error) {
//         res.status(500).json({
//             ok: false,
//             status: 500,
//             message: error.message,
//         });
//     }
// }





async function getIngresos(req, res) {
    try {
        const ingresos = await dbdepo.Ingreso.findAll();
        res.status(200).json({
            ok: true,
            status: 200,
            body: ingresos,
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: error.message,
        });
    }
}

async function getIngresoById(req, res) {
    const id = req.params.id;

    try {
        const ingresos = await dbdepo.Ingreso.findOne({
            where: { ingreso_id: id },
        });

        res.status(200).json({
            ok: true,
            status: 200,
            body: ingresos,
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: error.message,
        });
    }
}

async function updateIngresoById(req, res) {
    const id = req.params.id;
    const dataIngresos = req.body;

    try {
        const actualizaIngreso = await dbdepo.Ingreso.update(
            {
                cantidad: dataIngresos.cantidad,
                fecha: dataIngresos.fecha,
                tipo: "Ingreso",  // Este es un ingreso
            },
            {
                where: { ingreso_id: id },
            }
        );

        res.status(200).json({
            ok: true,
            status: 200,
            body: actualizaIngreso,
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: error.message,
        });
    }
}

async function deleteIngresoById(req, res) {
    const id = req.params.id;

    try {
        const eliminaIngreso = await dbdepo.Ingreso.destroy({
            where: { ingreso_id: id },
        });

        res.status(204).json({
            ok: true,
            status: 204,
            body: eliminaIngreso,
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
    createIngreso,
    getIngresos,
    getIngresoById,
    updateIngresoById,
    deleteIngresoById,
};
