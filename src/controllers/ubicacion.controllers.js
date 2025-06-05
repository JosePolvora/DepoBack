const dbdepo = require("../models/index.models");

// CREAR ubicacion
async function createUbicacion(req, res) {
    const dataUbicacion = req.body;

    // Crear el código de la ubicación aquí
    const codigoUbicacion = `${dataUbicacion.calle}${dataUbicacion.estanteria}${dataUbicacion.nivel}`;

    try {
        const crearUbicacion = await dbdepo.Ubicacion.create({
            codigo: codigoUbicacion,
            calle: dataUbicacion.calle,
            estanteria: dataUbicacion.estanteria,
            nivel: dataUbicacion.nivel


        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: "Ubicación creada",
            body: crearUbicacion,
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: error.message,
        });
    }
}

// OBTENER todas las ubicaciones
async function getUbicaciones(req, res) {
    try {
        const ubicaciones = await dbdepo.Ubicacion.findAll();
        res.status(200).json({
            ok: true,
            status: 200,
            body: ubicaciones,
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: error.message,
        });
    }
}


async function getUbicacionById(req, res) {
    const id = req.params.id;

    try {
        const ubicacion = await dbdepo.Ubicacion.findOne({
            where: { ubicacion_id: id },
        });

        res.status(200).json({
            ok: true,
            status: 200,
            body: ubicacion,
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: error.message,
        });
    }
}

async function getUbicacionByCodigo(req, res) {
    const codigoUbicacion = req.params.codigo;

    try {
        const ubicacion = await dbdepo.Ubicacion.findAll({
            where: { codigo: codigoUbicacion },
            include: [
                {
                    model: dbdepo.Planoxubicacion,
                    include: [
                        {
                            model: dbdepo.Plano,
                            attributes: ['plano', 'denominacion', 'origen']
                        }
                    ]
                }
            ]
        });

        res.status(200).json({
            ok: true,
            status: 200,
            body: ubicacion,
        });

    } catch (error) {
        console.error("Error al buscar ubicación:", error);
        res.status(500).json({
            ok: false,
            status: 500,
            message: error.message,
        });
    }
}

async function getUbicacionByCodigoUbicacion(req, res) {
    const codigoUbicacion = req.params.codigo;

    try {
        const ubicacion = await dbdepo.Ubicacion.findOne({
            where: { codigo: codigoUbicacion },
            include: [
                {
                    model: dbdepo.Planoxubicacion,
                    include: [
                        {
                            model: dbdepo.Plano,
                            attributes: ['plano', 'denominacion', 'origen']
                        }
                    ]
                }
            ]
        });

        res.status(200).json({
            ok: true,
            status: 200,
            body: ubicacion,
        });

    } catch (error) {
        console.error("Error al buscar ubicación:", error);
        res.status(500).json({
            ok: false,
            status: 500,
            message: error.message,
        });
    }
}







// ACTUALIZAR una ubicación por código
async function updateUbicacionByCodigo(req, res) {
    const codigoUbicacion = req.params.codigo;
    const dataUbicacion = req.body;

    // Crear el código de la ubicación aquí
    const codigoUbicacionActualizado = `${dataUbicacion.calle}${dataUbicacion.estanteria}${dataUbicacion.nivel}`;

    try {
        const actualizaUbicacion = await dbdepo.Ubicacion.update(
            {
                codigo: codigoUbicacionActualizado, // Actualiza el código aquí
                calle: dataUbicacion.calle,
                estanteria: dataUbicacion.estanteria,
                nivel: dataUbicacion.nivel

            },
            {
                where: { codigo: codigoUbicacion },
            }
        );

        res.status(200).json({
            ok: true,
            status: 200,
            body: actualizaUbicacion,
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: error.message,
        });
    }
}

// ELIMINAR una ubicación por código
async function deleteUbicacionByCodigo(req, res) {
    const codigoUbicacion = req.params.codigo;

    try {
        const eliminaUbicacion = await dbdepo.Ubicacion.destroy({
            where: { codigo: codigoUbicacion },
        });

        res.status(204).json({
            ok: true,
            status: 204,
            body: eliminaUbicacion,
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: error.message,
        });
    }
}

// Exports
module.exports = {
    createUbicacion,
    getUbicaciones,
    getUbicacionById,
    getUbicacionByCodigo,
    updateUbicacionByCodigo,
    deleteUbicacionByCodigo,
    getUbicacionByCodigoUbicacion,
};
