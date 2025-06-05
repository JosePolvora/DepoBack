const dbdepo = require("../models/index.models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'mi_secreto_super_seguro';
const Rol = dbdepo.Rol;
const Usuario = dbdepo.Usuario;


// ✅ Crear usuario con rol pasado por JSON (validado)

async function createUsuario(req, res) {
  const dataUsuarios = req.body;

  try {
    console.log(req.body);

    const hashedPassword = await bcrypt.hash(dataUsuarios.clave, 10);

    // Asignar valores por defecto
    const rolIdPorDefecto = 2;
    const activoPorDefecto = true;

    // Buscar y validar que el rol por defecto exista
    const rol = await Rol.findByPk(rolIdPorDefecto);
    if (!rol) {
      return res.status(400).json({
        ok: false,
        message: "Rol por defecto no encontrado. Verifica los datos en la base.",
      });
    }

    // Crear el usuario con valores predeterminados de rol_id y activo
    const crearUsuario = await Usuario.create({
      nombre: dataUsuarios.nombre,
      apellido: dataUsuarios.apellido,
      sector: dataUsuarios.sector,
      legajo: dataUsuarios.legajo,
      correo: dataUsuarios.correo,
      clave: hashedPassword,
      activo: activoPorDefecto,
      rol_id: rolIdPorDefecto
    });

    // Obtener usuario creado con el nombre del rol incluido
    const usuarioConRol = await Usuario.findByPk(crearUsuario.usuario_id, {
      include: {
        model: Rol,
        attributes: ['nombre']
      }
    });

    res.status(201).json({
      ok: true,
      message: "Usuario creado con éxito",
      usuario: usuarioConRol,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
}


// ✅ Login que incluye el rol con alias 'rol'
async function loginUsuario(req, res) {
  const { correo, clave } = req.body;
  console.log("Datos recibidos para login:", correo, clave);

  try {
    const usuario = await Usuario.findOne({
      where: { correo },
      include: [{ model: Rol, as: 'rol' }]  // Usamos el alias 'rol'
    });

    if (!usuario) {
      return res.status(401).json({ ok: false, message: 'Correo no encontrado' });
    }

    const claveValida = await bcrypt.compare(clave, usuario.clave);

    if (!claveValida) {
      return res.status(401).json({ ok: false, message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      {
        id: usuario.usuario_id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol?.nombre || "Sin rol",  // Cambiado a minúscula 'rol'
      },
      SECRET_KEY,
      { expiresIn: '2h' }
    );

    res.status(200).json({
      ok: true,
      message: 'Inicio de sesión exitoso',
      token,
      usuario: {
        id: usuario.usuario_id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        correo: usuario.correo,
        rol: usuario.rol?.nombre || "Sin rol"  // Cambiado a minúscula 'rol'
      },
    });

  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
}

// ✅ Obtener todos los usuarios (con roles)
async function getUsuarios(req, res) {
  try {
    const usuarios = await Usuario.findAll({
      include: [{ model: Rol, as: 'rol' }]
    });
    res.status(200).json({ ok: true, body: usuarios });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
}

// // ✅ Obtener un usuario por ID (con rol)
async function getUsuarioById(req, res) {
  const id = req.params.id;
  try {
    const usuario = await Usuario.findOne({
      where: { usuario_id: id },
      include: [{ model: Rol, as: 'rol' }]
    });
    res.status(200).json({ ok: true, body: usuario });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
}

// ✅ Actualizar usuario (también podés cambiar su rol)
async function updateUsuario(req, res) {
  const id = req.params.id;
  const dataUsuarios = req.body;

  try {
    let nuevaClave = dataUsuarios.clave;
    if (dataUsuarios.clave) {
      nuevaClave = await bcrypt.hash(dataUsuarios.clave, 10);
    }

    const actualizaUsuario = await Usuario.update(
      {
        nombre: dataUsuarios.nombre,
        apellido: dataUsuarios.apellido,
        sector: dataUsuarios.sector,
        legajo: dataUsuarios.legajo,
        correo: dataUsuarios.correo,
        clave: nuevaClave,
        activo: dataUsuarios.activo,
        rol_id: dataUsuarios.rol_id, // se puede actualizar el rol también
      },
      { where: { usuario_id: id } }
    );

    res.status(200).json({ ok: true, body: actualizaUsuario });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
}

// ✅ Eliminar usuario
async function deleteUsuario(req, res) {
  const id = req.params.id;

  try {
    const eliminaUsuario = await Usuario.destroy({
      where: { usuario_id: id },
    });

    res.status(204).json({ ok: true });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
}

const createUsuarioAdmin = async (req, res) => {
  try {
    const dataUsuarios = req.body;

    // Obtener la parte del correo antes del @
    const correo = dataUsuarios.correo;
    const clavePorDefecto = correo.split('@')[0];

    // Hashear la clave
    const hashedPassword = await bcrypt.hash(clavePorDefecto, 10);

    const nuevoUsuario = await Usuario.create({
      nombre: dataUsuarios.nombre,
      apellido: dataUsuarios.apellido,
      correo: correo,
      sector: dataUsuarios.sector,
      legajo: dataUsuarios.legajo,
      rol_id: dataUsuarios.rol || 2,
      activo: dataUsuarios.activo !== undefined ? dataUsuarios.activo : true,
      clave: hashedPassword,
    });

    res.status(201).json({ ok: true, message: 'Usuario creado con éxito', data: nuevoUsuario });

  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ ok: false, message: 'Error interno del servidor.' });
  }
};


module.exports = {
  createUsuario,
  loginUsuario,
  getUsuarios,
  getUsuarioById,
  updateUsuario,
  deleteUsuario,
  createUsuarioAdmin,
};