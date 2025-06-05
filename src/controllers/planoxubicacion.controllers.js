const dbdepo = require("../models/index.models");

// Crear nueva relación Plano-Ubicación
async function createPlanoxubicacion(req, res) {
    const { plano_id, ubicacion_id, stock, fecha } = req.body;

    if (!plano_id || !ubicacion_id || stock === undefined) {
        return res.status(400).json({
            ok: false,
            status: 400,
            message: "Datos incompletos: se requiere plano_id, ubicacion_id y stock.",
        });
    }

    try {
        const nuevaRelacion = await dbdepo.Planoxubicacion.create({
            plano_id,
            ubicacion_id,
            stock,
            fecha: fecha || new Date()
        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: "Planoxubicacion creado correctamente.",
            body: nuevaRelacion,
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: error.message,
        });
    }
}


// Función interna para actualizar stock en plano+ubicacion
async function actualizarStockPlano(plano_id, ubicacion_id, cantidad) {
    const relacion = await dbdepo.Planoxubicacion.findOne({
        where: { plano_id, ubicacion_id }
    });

    if (relacion) {
        // Actualiza stock sumando o restando
        relacion.stock += cantidad;
        if (relacion.stock < 0) relacion.stock = 0; // evitar stock negativo
        await relacion.save();
        return relacion;
    } else {
        if (cantidad > 0) {
            // Crea nueva relación si no existe y cantidad > 0
            const nuevaRelacion = await dbdepo.Planoxubicacion.create({
                plano_id,
                ubicacion_id,
                stock: cantidad,
                fecha: new Date()
            });
            return nuevaRelacion;
        } else {
            throw new Error('No hay stock previo para decrementar');
        }
    }
}


// Controlador para la ruta POST /planoxubicacion/actualizar-stock
async function actualizarStockYFecha(req, res) {
    const { plano_id, ubicacion_id, cantidad } = req.body;

    if (!plano_id || !ubicacion_id || cantidad === undefined) {
        return res.status(400).json({ ok: false, message: "Datos incompletos: plano_id, ubicacion_id y cantidad son requeridos." });
    }

    try {
        const resultado = await actualizarStockPlano(plano_id, ubicacion_id, cantidad);
        res.status(200).json({
            ok: true,
            message: "Stock actualizado correctamente.",
            body: resultado
        });
    } catch (error) {
        res.status(500).json({ ok: false, message: error.message });
    }
}


async function actualizarStockyUbicacion(req, res) {
    const { plano_id, ubicacion_id, cantidad } = req.body;

    if (!plano_id || !ubicacion_id || cantidad === undefined) {
        return res.status(400).json({ ok: false, message: "Datos incompletos: plano_id, ubicacion_id y cantidad son requeridos." });
    }

    try {
        const resultado = await actualizarStockPlano(plano_id, ubicacion_id, cantidad);
        res.status(200).json({
            ok: true,
            message: "Stock actualizado correctamente.",
            body: resultado
        });
    } catch (error) {
        res.status(500).json({ ok: false, message: error.message });
    }
}

// Obtener todas las relaciones Plano-Ubicación
async function getPlanosxubicaciones(req, res) {
    try {
        const planoxubicaciones = await dbdepo.Planoxubicacion.findAll({
            include: [
                { model: dbdepo.Plano },
                { model: dbdepo.Ubicacion },
            ],
        });

        res.status(200).json({
            ok: true,
            status: 200,
            body: planoxubicaciones,
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: error.message,
        });
    }
}


// Obtener una relación específica por ID
async function getPlanoxubicacionById(req, res) {
    const id = req.params.id;

    try {
        const planoxubicacion = await dbdepo.Planoxubicacion.findOne({
            where: { planoxubicacion_id: id },

            include: [
                { model: dbdepo.Plano, attributes: ['plano_id', 'denominacion'] },
                { model: dbdepo.Ubicacion }
            ]

        });


        if (!planoxubicacion) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "Planoxubicacion no encontrada.",
            });
        }

        res.status(200).json({
            ok: true,
            status: 200,
            body: planoxubicacion,
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: error.message,
        });
    }
}


//Actualizar una relación existente por ID
async function updatePlanoxubicacionById(req, res) {
    const id = req.params.id;
    const { plano_id, ubicacion_id, stock } = req.body;

    try {
        const actualizaPlanoxubicacion = await dbdepo.Planoxubicacion.update(
            {
                plano_id,
                ubicacion_id,
                stock,
            },
            {
                where: { planoxubicacion_id: id },
            }
        );

        if (actualizaPlanoxubicacion[0] === 0) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "No se encontró la relación para actualizar.",
            });
        }

        res.status(200).json({
            ok: true,
            status: 200,
            message: "Planoxubicacion actualizada correctamente.",
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: error.message,
        });
    }
}


async function moverStockEntreUbicaciones(req, res) {
    console.log("Body recibido:", req.body);

    const { plano_id, ubicacion_origen_id, ubicacion_destino_id, cantidad } = req.body;

    // Validar que los datos requeridos estén presentes y cantidad sea número positivo
    if (
        !plano_id ||
        !ubicacion_origen_id ||
        !ubicacion_destino_id ||
        typeof cantidad !== 'number' ||
        cantidad <= 0
    ) {
        return res.status(400).json({ ok: false, message: "Faltan datos requeridos o cantidad inválida." });
    }

    try {
        const origen = await dbdepo.Planoxubicacion.findOne({
            where: { plano_id, ubicacion_id: ubicacion_origen_id }
        });

        if (!origen) {
            return res.status(404).json({ ok: false, message: "No se encontró la ubicación de origen." });
        }

        if (origen.stock < cantidad) {
            return res.status(400).json({ ok: false, message: "Stock insuficiente en la ubicación de origen." });
        }

        // Restar stock a la ubicación de origen
        origen.stock -= cantidad;
        await origen.save();

        // Buscar o crear la ubicación destino
        const [destino, created] = await dbdepo.Planoxubicacion.findOrCreate({
            where: { plano_id, ubicacion_id: ubicacion_destino_id },
            defaults: { stock: 0 }
        });

        destino.stock += cantidad;
        await destino.save();

        return res.status(200).json({ ok: true, message: "Stock movido correctamente." });

    } catch (error) {
        console.error("Error al mover stock:", error);
        return res.status(500).json({ ok: false, message: error.message });
    }
}


// Eliminar una relación por ID
async function deletePlanoxubicacionById(req, res) {
    const id = req.params.id;

    try {
        const eliminaPlanoxubicacion = await dbdepo.Planoxubicacion.destroy({
            where: { planoxubicacion_id: id },
        });

        if (eliminaPlanoxubicacion === 0) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "No se encontró la relación para eliminar.",
            });
        }

        res.sendStatus(204); // No enviar body para 204

    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: error.message,
        });
    }
}


// Asignar una ubicación a un plano (crear o actualizar si ya existe)
async function asignarUbicacionAPlano(req, res) {
    const { plano_id, ubicacion_id, stock } = req.body;

    if (!plano_id || !ubicacion_id || stock === undefined) {
        return res.status(400).json({
            ok: false,
            message: "Faltan datos obligatorios (plano_id, ubicacion_id, stock)."
        });
    }

    try {
        // Verificamos que existan el plano y la ubicación
        const plano = await dbdepo.Plano.findByPk(plano_id);
        const ubicacion = await dbdepo.Ubicacion.findByPk(ubicacion_id);

        if (!plano || !ubicacion) {
            return res.status(404).json({
                ok: false,
                message: "Plano o Ubicación no encontrados."
            });
        }

        // Buscar si ya existe una relación
        const relacionExistente = await dbdepo.Planoxubicacion.findOne({
            where: {
                plano_id,
                ubicacion_id
            }
        });

        if (relacionExistente) {
            // Si existe, actualizar el stock
            relacionExistente.stock = stock;
            await relacionExistente.save();

            return res.status(200).json({
                ok: true,
                message: "Relación actualizada correctamente.",
                body: relacionExistente
            });
        }

        // Si no existe, crear una nueva relación
        const nuevaRelacion = await dbdepo.Planoxubicacion.create({
            plano_id,
            ubicacion_id,
            stock
        });

        res.status(201).json({
            ok: true,
            message: "Ubicación asignada al plano correctamente.",
            body: nuevaRelacion
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        });
    }
}


async function deletePlanoxubicacionByPlanoYUbicacion(req, res) {
    const { plano_id, ubicacion_id } = req.body;

    try {
        const eliminaPlanoxubicacion = await dbdepo.Planoxubicacion.destroy({
            where: { plano_id, ubicacion_id },
        });

        if (eliminaPlanoxubicacion === 0) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "No se encontró la relación para eliminar.",
            });
        }

        res.sendStatus(204);

    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: error.message,
        });
    }
}


module.exports = {
    createPlanoxubicacion,
    getPlanosxubicaciones,
    getPlanoxubicacionById,
    updatePlanoxubicacionById,
    deletePlanoxubicacionById,
    asignarUbicacionAPlano,
    actualizarStockYFecha,
    actualizarStockyUbicacion,
    deletePlanoxubicacionByPlanoYUbicacion,
    moverStockEntreUbicaciones,
};
