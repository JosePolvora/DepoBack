// const dbdepo = require("../models/index.models");

// async function createOrigen(req, res) {
//     const dataOrigenes = req.body;

//     try {
//         const crearOrigen = await dbdepo.Origen.create({
//             nombre: dataOrigenes.nombre,
           
//         });

//         res.status(201).json({
//             ok: true,
//             status: 201,
//             message: "Origen creado",
//             body: crearOrigen,
//         });

//     } catch (error) {
//         res.status(500).json({
//             ok: false,
//             status: 500,
//             message: error.message,
//         });
//     }
// }

// async function getOrigenes(req, res) {
//     try {
//         const origenes = await dbdepo.Origen.findAll();
//         res.status(200).json({
//             ok: true,
//             status: 200,
//             body: origenes,
//         });

//     } catch (error) {
//         res.status(500).json({
//             ok: false,
//             status: 500,
//             message: error.message,
//         });
//     }
// }

// async function getOrigenById(req, res) {
//     const id = req.params.id;

//     try {
//         const origenes = await dbdepo.Origen.findOne({
//             where: { origen_id: id },
//         });

//         res.status(200).json({
//             ok: true,
//             status: 200,
//             body: origenes,
//         });

//     } catch (error) {
//         res.status(500).json({
//             ok: false,
//             status: 500,
//             message: error.message,
//         });
//     }
// }

// async function updateOrigenById(req, res) {
//     const id = req.params.id;
//     const dataOrigenes = req.body;

//     try {
//         const actualizaOrigen = await dbdepo.Origen.update(
//             {
//                 nombre: dataOrigenes.nombre,
//             },
//             {
//                 where: { origen_id: id },
//             }
//         );

//         res.status(200).json({
//             ok: true,
//             status: 200,
//             body: actualizaOrigen,
//         });

//     } catch (error) {
//         res.status(500).json({
//             ok: false,
//             status: 500,
//             message: error.message,
//         });
//     }
// }

// async function deleteOrigenById(req, res) {
//     const id = req.params.id;

//     try {
//         const eliminaOrigen = await dbdepo.Origen.destroy({
//             where: { origen_id: id },
//         });

//         res.status(204).json({
//             ok: true,
//             status: 204,
//             body: eliminaOrigen,
//         });

//     } catch (error) {
//         res.status(500).json({
//             ok: false,
//             status: 500,
//             message: error.message,
//         });
//     }
// }

// module.exports = {
//     createOrigen,
//     getOrigenes,
//     getOrigenById,
//     updateOrigenById,
//     deleteOrigenById,
// };
