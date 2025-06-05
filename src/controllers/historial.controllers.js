const dbdepo = require("../models/index.models");

async function createHistorial(req, res) {
    const dataHistorial = req.body;

    try {
        const crearHistorial = await dbdepo.Historial.create({
            fecha: dataHistorial.fecha // O simplemente {} si usás default
        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: "Historial creado",
            body: crearHistorial,
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: error.message,
        });
    }
}

// async function getHistoriales(req, res) {
//     try {
//         const historiales = await dbdepo.Historial.findAll({
//             include: [
//                 {
//                     model: dbdepo.Plano,
//                     attributes: ['plano', 'denominacion', 'stock']
//                 },
//                 {
//                     model: dbdepo.Ubicacion,
//                     attributes: ['codigo']
//                 },
//                 {
//                     model: dbdepo.Usuario,
//                     attributes: ['nombre', 'apellido', 'sector', 'legajo']
//                 },
//                 {
//                     model: dbdepo.Egreso,
//                     attributes: ['cantidad']
//                 },
//                 {
//                     model: dbdepo.Ingreso,
//                     attributes: ['cantidad']
//                 }
//             ]
//         });

//         res.status(200).json({
//             ok: true,
//             status: 200,
//             body: historiales,
//         });

//     } catch (error) {
//         res.status(500).json({
//             ok: false,
//             status: 500,
//             message: error.message,
//         });
//     }
// }


async function getHistoriales(req, res) {
    try {
        const historiales = await dbdepo.Historial.findAll({
            include: [
                {
                    model: dbdepo.Plano,
                    attributes: ['plano', 'denominacion'],
                    include: [
                        {
                            model: dbdepo.Planoxubicacion,
                            attributes: ['stock'],
                            include: [
                                {
                                    model: dbdepo.Ubicacion,
                                    attributes: ['codigo']
                                }
                            ]
                        }
                    ]
                },
                {
                    model: dbdepo.Ubicacion,
                    attributes: ['codigo']
                },
                {
                    model: dbdepo.Usuario,
                    attributes: ['nombre', 'apellido', 'sector', 'legajo']
                },
                {
                    model: dbdepo.Egreso,
                    attributes: ['cantidad']
                },
                {
                    model: dbdepo.Ingreso,
                    attributes: ['cantidad']
                }
            ]
        });
        // const historiales = await dbdepo.Historial.findAll({
        //     include: [
        //         {
        //             model: dbdepo.Plano,
        //             attributes: ['plano', 'denominacion']
        //         },
        //         {
        //             model: dbdepo.Ubicacion,
        //             attributes: ['codigo']
        //         }
        //     ]
        // });


        res.status(200).json({
            ok: true,
            status: 200,
            body: historiales,
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: error.message,
        });
    }
}





async function getHistorialByPlano(req, res) {
    const plano = req.params.plano_id;

    try {
        const historiales = await dbdepo.Historial.findAll({
            where: { plano_id: plano },
            include: [
                {
                    model: dbdepo.Plano,
                    attributes: ['plano', 'denominacion', 'stock']
                },
                {
                    model: dbdepo.Ubicacion,
                    attributes: ['codigo']
                },
                {
                    model: dbdepo.Usuario,
                    attributes: ['nombre', 'apellido', 'sector', 'legajo']
                },
                {
                    model: dbdepo.Egreso,
                    attributes: ['cantidad']
                },
                {
                    model: dbdepo.Ingreso,
                    attributes: ['cantidad']
                }
            ]
        });

        res.status(200).json({
            ok: true,
            status: 200,
            body: historiales,
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: error.message,
        });
    }
}

async function getHistorialById(req, res) {
    const id = req.params.id;

    try {
        const historial = await dbdepo.Historial.findOne({
            where: { historial_id: id },
            include: [
                {
                    model: dbdepo.Plano,
                    attributes: ['plano', 'denominacion', 'stock']
                },
                {
                    model: dbdepo.Ubicacion,
                    attributes: ['codigo']
                },
                {
                    model: dbdepo.Usuario,
                    attributes: ['nombre', 'apellido', 'sector', 'legajo']
                },
                {
                    model: dbdepo.Egreso,
                    attributes: ['cantidad']
                },
                {
                    model: dbdepo.Ingreso,
                    attributes: ['cantidad']
                }
            ]
        });

        res.status(200).json({
            ok: true,
            status: 200,
            body: historial,
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
    createHistorial,
    getHistoriales,
    getHistorialById,
    getHistorialByPlano,
};
