const dbdepo = require("../models/index.models");

async function createRol(req, res) {
    const dataRoles = req.body;

    try {
        const crearRol = await dbdepo.Rol.create({
            nombre: dataRoles.nombre,
            
        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: "Rol creado",
            body: crearRol,
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: error.message,
        });
    }
}

async function getRoles(req, res) {
    try {
        const roles = await dbdepo.Rol.findAll();
        res.status(200).json({
            ok: true,
            status: 200,
            body: roles,
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: error.message,
        });
    }
}


async function getRolById(req, res) {
    const id = req.params.id;

    try {
        const rol = await dbdepo.Rol.findOne({
            where: { rol_id: id },
        });

        res.status(200).json({
            ok: true,
            status: 200,
            body: rol,
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: error.message,
        });
    }
}

async function updateRolById(req, res) {
    const id = req.params.id;
    const dataRoles = req.body;

    try {
        const actualizaRol = await dbdepo.Rol.update(
            {
                nombre: dataRoles.nombre,
            },
            {
                where: { rol_id: id },
            }
        );

        res.status(200).json({
            ok: true,
            status: 200,
            body: actualizaRol,
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: error.message,
        });
    }
}

async function deleteRolById(req, res) {
    const id = req.params.id;

    try {
        const eliminaRol = await dbdepo.Rol.destroy({
            where: { rol_id: id },
        });

        res.status(204).json({
            ok: true,
            status: 204,
            body: eliminaRol,
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
    createRol,
    getRoles,
    getRolById,
    updateRolById,
    deleteRolById,
};
