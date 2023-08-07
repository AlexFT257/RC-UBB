const { UserInputError } = require("apollo-server-express");
const Usuario = require("../models/usuario.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { sendPasswordResetEmail } = require("../utils/email");
const mongoose = require("mongoose");
const JWT_SECRET = "SUPER_HYPER_MEGA_PALABRA_SECRETA";


const mutations = {
  crearUsuario: async (root, args, { res }) => {
    const { fecha_nacimiento, contrasena, ...restoArgs } = args;
    // Validar la fecha de nacimiento para asegurarse de que el usuario tenga al menos 17 años
    const today = new Date();
    const birthDate = new Date(fecha_nacimiento);
    const ageDifference = today.getFullYear() - birthDate.getFullYear();
    const hasPassedBirthday = today.getMonth() >= birthDate.getMonth() && today.getDate() >= birthDate.getDate();
    const isAtLeastSeventeen = ageDifference > 17 || (ageDifference === 17 && hasPassedBirthday);

    if (!isAtLeastSeventeen) {
      throw new UserInputError("Debes tener al menos 17 años para registrarte", {
        invalidArgs: args,
      });
    }
    const usuarioExistente = await Usuario.findOne({
      correo: restoArgs.correo,
    });
    if (usuarioExistente) {
      throw new Error("Ya existe un usuario con este correo");
    }
    if (!contrasena) {
      throw new Error("La contraseña es requerida");
    }
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
    const temporalKey = Math.random().toString(36).substring(2, 10);
    const hashedTemporalKey = await bcrypt.hash(temporalKey, 10);
    usuario.temporalKey = hashedTemporalKey;
    await usuario.save();
    await sendPasswordResetEmail(usuario.correo, temporalKey);

    return {
      success: true,
    };
  },
  verificarClaveTemporal: async (root, { temporalKey, correo }) => {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      throw new Error("El correo no coincide con ningún usuario");
    }
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
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      throw new Error("La clave temporal no es válida o el correo no coincide");
    }
    const claveTemporalValida = await bcrypt.compare(
      temporalKey,
      usuario.temporalKey
    );
    if (!claveTemporalValida) {
      throw new Error("La clave temporal no es correcta");
    }
    const hashedPassword = await bcrypt.hash(nuevaClave, 10);
    usuario.contrasena = hashedPassword;
    await usuario.save();
    return true;
  },
  login: async (root, { correo, contrasena }, { res }) => {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      throw new Error("Correo o contraseña incorrectos");
    }
    const contrasenaValida = await bcrypt.compare(
      contrasena,
      usuario.contrasena
    );
    if (!contrasenaValida) {
      throw new Error("Correo o contraseña incorrectos");
    }
    const token = jwt.sign({ id: usuario.id }, JWT_SECRET);
    return {
      usuario,
      token,
      value: token,
    };
  },
  editarUsuario: async (root, args, context) => {
    const { id, contrasena, ...restoArgs } = args;

    const usuarioExistente = await Usuario.findById(id);
    if (!usuarioExistente) {
      throw new Error('No se encontró ningún usuario con el ID proporcionado');
    }
    if (contrasena) {
      const hashedContrasena = await bcrypt.hash(contrasena, 10);
      if (!hashedContrasena) {
        throw new Error('Error al cifrar la contraseña');
      }

      usuarioExistente.contrasena = hashedContrasena;
    }
    

    Object.assign(usuarioExistente, restoArgs);

    try {
      return usuarioExistente.save();
    } catch (error) {
      throw new UserInputError(error.message, {
        invalidArgs: args,
      });
    }
  },
  eliminarUsuario: async (root, args) => {
    const { id, contrasena, ...restoArgs } = args;
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
  agregarAmigo: async (root, args) => {
    const { amigo } = args;
    const usuario = await Usuario.findById(args.id);
    try {
      usuario.amigos.push(amigo);
      return usuario.save();
    } catch (error) {
      throw new UserInputError(error.message, {
        invalidArgs: args,
      });
    }
  },
};

module.exports = mutations;