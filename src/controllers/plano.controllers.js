const dbdepo = require("../models/index.models");

async function createPlano(req, res) {
  const dataPlano = req.body;

  try {
    const crearPlano = await dbdepo.Plano.create({
      plano: dataPlano.plano,
      denominacion: dataPlano.denominacion,
      origen: dataPlano.origen,
    });

    res.status(201).json({
      ok: true,
      status: 201,
      message: "Plano creado",
      body: crearPlano,
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
}


async function getPlanos(req, res) {
  try {
    const planos = await dbdepo.Plano.findAll();
    res.status(200).json({
      ok: true,
      status: 200,
      body: planos,
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
}

async function getPlanoById(req, res) {
  const id = req.params.id;

  try {
    const plano = await dbdepo.Plano.findOne({
      where: { plano_id: id },
    });

    res.status(200).json({
      ok: true,
      status: 200,
      body: plano,
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
}

////////////////////// Paginacion /////////////////////////////////////////////

const { Sequelize, Op } = require('sequelize');

const getPlanosConStockTotal = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';

    // Filtro de búsqueda con LIKE (compatible con MySQL/MariaDB)
    const whereClause = search
      ? {
        [Op.or]: [
          { plano: { [Op.like]: `%${search}%` } },
          { denominacion: { [Op.like]: `%${search}%` } },
        ],
      }
      : {};

    // Contar total de planos con el filtro para la paginación
    const totalPlanos = await dbdepo.Plano.count({ where: whereClause });

    // Obtener planos con paginación
    const planos = await dbdepo.Plano.findAll({
      attributes: ['plano_id', 'plano', 'denominacion', 'origen'],
      where: whereClause,
      offset: (page - 1) * limit,
      limit,
      raw: true,
    });

    // Obtener stock total para los planos encontrados
    const planoIds = planos.map((p) => p.plano_id);

    const stockPorPlano = await dbdepo.Planoxubicacion.findAll({
      attributes: [
        'plano_id',
        [Sequelize.fn('SUM', Sequelize.col('stock')), 'stock_total'],
      ],
      where: {
        plano_id: planoIds,
      },
      group: ['plano_id'],
      raw: true,
    });

    // Convertir en un objeto mapa para acceso rápido
    const stockMap = {};
    stockPorPlano.forEach((item) => {
      stockMap[item.plano_id] = parseInt(item.stock_total, 10) || 0;
    });

    // Combinar los datos de planos con su stock total
    const planosConStockTotal = planos.map((plano) => ({
      ...plano,
      stock_total: stockMap[plano.plano_id] || 0,
    }));

    return res.status(200).json({
      ok: true,
      status: 200,
      body: planosConStockTotal,
      total: totalPlanos,
      page,
      limit,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
};

///////////////////////////////////////////////////////////////////////////////

const Plano = dbdepo.Plano;
const Planoxubicacion = dbdepo.Planoxubicacion;
const Ubicacion = dbdepo.Ubicacion;

async function getPlanoByNumeroDenominacion(req, res) {
  const numeroPlano = req.params.plano;

  try {
    const plano = await Plano.findOne({
      where: { plano: numeroPlano },
      include: [
        {
          model: Planoxubicacion,
          include: [{ model: Ubicacion }],
        },
      ],
    });



    if (!plano) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Plano no encontrado",
      });
    }

    res.status(200).json({
      ok: true,
      status: 200,
      body: plano,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
}


async function getPlanoByNumero(req, res) {
  const numeroPlano = req.params.plano;

  try {
    const plano = await Plano.findAll({
      where: { plano: numeroPlano },
      include: [
        {
          model: Planoxubicacion,
          include: [{ model: Ubicacion }],
        },
      ],
    });



    if (!plano) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Plano no encontrado",
      });
    }

    res.status(200).json({
      ok: true,
      status: 200,
      body: plano,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
}


async function updatePlanoByNumero(req, res) {
  const numeroPlano = req.params.plano;
  const dataPlano = req.body;

  try {
    const actualizaPlano = await dbdepo.Plano.update(
      {

        denominacion: dataPlano.denominacion,
        origen: dataPlano.origen,

      },
      {
        where: { plano: numeroPlano },
      }
    );

    res.status(200).json({
      ok: true,
      status: 200,
      body: actualizaPlano,
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
}


async function deletePlanoByNumero(req, res) {
  const numeroPlano = req.params.plano;

  try {
    const eliminaPlano = await dbdepo.Plano.destroy({
      where: { plano: numeroPlano },
    });

    res.status(204).json({
      ok: true,
      status: 204,
      body: eliminaPlano,
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
}


async function deletePlanoById(req, res) {
  const id = req.params.id;

  try {
    const eliminaPlano = await dbdepo.Plano.destroy({
      where: { plano_id: id },
    });

    res.status(204).json({
      ok: true,
      status: 204,
      body: eliminaPlano,
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
}


async function getHistorialMovimientos(req, res) {
  try {
    const ingresos = await dbdepo.Ingreso.findAll({
      include: [
        {
          model: dbdepo.Planoxubicacion,
          include: [
            {
              model: dbdepo.Plano,
              attributes: ['plano_id', 'plano', 'denominacion', 'origen']
            },
            {
              model: dbdepo.Ubicacion,
              attributes: ['ubicacion_id', 'codigo']
            }
          ]
        }
      ],
      order: [['fecha', 'DESC']]
    });

    const egresos = await dbdepo.Egreso.findAll({
      include: [
        {
          model: dbdepo.Planoxubicacion,
          include: [
            {
              model: dbdepo.Plano,
              attributes: ['plano_id', 'plano', 'denominacion', 'origen']
            },
            {
              model: dbdepo.Ubicacion,
              attributes: ['ubicacion_id', 'codigo']
            }
          ]
        }
      ],
      order: [['fecha', 'DESC']]
    });

    res.status(200).json({
      ok: true,
      status: 200,
      body: {
        ingresos,
        egresos
      }
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message
    });
  }
}

async function getPlanoByNumeroQr(req, res) {
  const numeroPlano = req.params.plano;

  try {
    const plano = await Plano.findOne({
      where: { plano: numeroPlano },
      include: [
        {
          model: Planoxubicacion,
          include: [{ model: Ubicacion }],
        },
      ],
    });

    if (!plano) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Plano no encontrado",
      });
    }

    res.status(200).json({
      ok: true,
      status: 200,
      body: plano,
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
  createPlano,
  getPlanos,
  getPlanoById,
  getPlanoByNumero,
  updatePlanoByNumero,
  deletePlanoByNumero,
  deletePlanoById,
  getPlanoByNumeroDenominacion,
  getHistorialMovimientos,
  getPlanosConStockTotal,
  getPlanoByNumeroQr,
};