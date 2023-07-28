const { UserInputError } = require("apollo-server-express");
const Usuario = require("../models/usuario.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { sendPasswordResetEmail } = require("../utils/email");
const mongoose = require("mongoose");
const JWT_SECRET = "SUPER_HYPER_MEGA_PALABRA_SECRETA";


const mutations = {
  crearUsuario: async (root, args, { res }) => {
    const { contrasena, ...restoArgs } = args;

    // Verificar si el usuario ya existe en la base de datos
    const usuarioExistente = await Usuario.findOne({
      correo: restoArgs.correo,
    });

    if (usuarioExistente) {
      throw new Error("Ya existe un usuario con este correo");
    }

    // Verificar si el campo 'contrasena' tiene un valor válido
    if (!contrasena) {
      throw new Error("La contraseña es requerida");
    }

    // Cifrar la contraseña utilizando bcrypt
    const hashedContrasena = await bcrypt.hash(contrasena, 10);

    if (!hashedContrasena) {
      throw new Error("Error al cifrar la contraseña");
    }

    const usuario = new Usuario({
      _id: mongoose.Types.ObjectId(),
      ...restoArgs,
      contrasena: hashedContrasena,
    });

    try {
      // Guardar el usuario en la base de datos
      return usuario.save();
    } catch (error) {
      throw new UserInputError(error.message, {
        invalidArgs: args,
      });
    }
  },
  forgotPassword: async (root, { correo }) => {
    const usuario = await Usuario.findOne({ correo: correo });

    if (!usuario) {
      throw new Error("No existe un usuario con este correo");
    }

    // Generar una clave temporal
    const temporalKey = Math.random().toString(36).substring(2, 10);

    // Cifrar la clave temporal utilizando bcrypt
    const hashedTemporalKey = await bcrypt.hash(temporalKey, 10);

    // Guardar la clave temporal en el documento del usuario
    usuario.temporalKey = hashedTemporalKey;
    await usuario.save();

    // Enviar la clave temporal por correo electrónico
    await sendPasswordResetEmail(usuario.correo, temporalKey);

    return {
      success: true,
    };
  },
  forgotPassword: async (root, { correo }) => {
    const usuario = await Usuario.findOne({ correo: correo });

    if (!usuario) {
      throw new Error("No existe un usuario con este correo");
    }

    // Generar una clave temporal
    const temporalKey = Math.random().toString(36).substring(2, 10);

    // Cifrar la clave temporal utilizando bcrypt
    const hashedTemporalKey = await bcrypt.hash(temporalKey, 10);

    // Guardar la clave temporal en el documento del usuario
    usuario.temporalKey = hashedTemporalKey;
    await usuario.save();

    // Enviar la clave temporal por correo electrónico
    await sendPasswordResetEmail(usuario.correo, temporalKey);

    return {
      success: true,
    };
  },
  verificarClaveTemporal: async (root, { temporalKey, correo }) => {
    // Buscar al usuario por el correo electrónico
    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      throw new Error("El correo no coincide con ningún usuario");
    }

    // Comparar la clave temporal ingresada con la clave temporal cifrada almacenada en el usuario
    const claveTemporalValida = await bcrypt.compare(
      temporalKey,
      usuario.temporalKey
    );

    if (!claveTemporalValida) {
      throw new Error("La clave temporal no es válida");
    }

    return true;
  },
  actualizarContrasena: async (root, { correo, temporalKey, nuevaClave }) => {
    // Buscar al usuario por el correo electrónico y la clave temporal
    //console.log("correo:", correo);
    //console.log("temporalKey:", temporalKey);
    const usuario = await Usuario.findOne({ correo });

    //console.log("correo registrado:", usuario.correo);

    //console.log("clave temporal del usuario:", usuario.temporalKey);

    if (!usuario) {
      throw new Error("La clave temporal no es válida o el correo no coincide");
    }

    // Verificar si la clave temporal coincide
    const claveTemporalValida = await bcrypt.compare(
      temporalKey,
      usuario.temporalKey
    );

    if (!claveTemporalValida) {
      throw new Error("La clave temporal no es correcta");
    }

    // Validar la nueva contraseña y cifrarla
    const hashedPassword = await bcrypt.hash(nuevaClave, 10);

    // Actualizar la contraseña del usuario
    usuario.contrasena = hashedPassword;
    await usuario.save();

    return true;
  },
  login: async (root, { correo, contrasena }, { res }) => {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      throw new Error("Correo o contraseña incorrectos");
    }
    // Comparar la contraseña ingresada con la almacenada en la base de datos
    const contrasenaValida = await bcrypt.compare(
      contrasena,
      usuario.contrasena
    );
    if (!contrasenaValida) {
      throw new Error("Correo o contraseña incorrectos");
    }
    // Generar el token JWT
    const token = jwt.sign({ id: usuario.id }, JWT_SECRET);
    console.log("id usuario:", usuario.id);
    console.log("token usuario:", token);
    const cookieOptions = {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      domain: "localhost",
      path: "/",
    };

    //res.headers.cookies('token', token, cookieOptions);

    return {
      usuario,
      token,
      value: token,
    };
  },
  editarUsuario: async (root, args) => {
    let usuario = await Usuario.findById(args.id);
    if (!usuario) {
      return null;
    }
    usuario.nombre = args.nombre;
    usuario.apellido = args.apellido;
    usuario.username = args.username;
    usuario.correo = args.correo;
    usuario.carrera = args.carrera;
    usuario.contrasena = args.contrasena;
    usuario.amigos.push(args.amigos);
    try {
      await usuario.save();
      return usuario;
    }
    catch (error) {
      throw new UserInputError(error.message, {
        invalidArgs: args,
      });
    }

  },
  eliminarUsuario: async (root, args) => {
    const usuario = await Usuario.findById(args.id);
    try {
      await Usuario.findByIdAndDelete(args.id);
      return usuario;
    } catch (error) {
      throw new UserInputError(error.message, {
        invalidArgs: args,
      });
    }
  },
};

module.exports = mutations;
