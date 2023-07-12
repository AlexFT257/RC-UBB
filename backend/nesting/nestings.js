const Carrera = require("../models/carrera.js");
const Chat = require("../models/chat.js");
const Grupo = require("../models/grupo.js");
const Publicacion = require("../models/publicacion.js");
const Usuario = require("../models/usuario.js");
const Mensaje = require("../models/mensaje.js");

const UsuarioNesting = {
  carrera: async (parent) => {
    const carrera = await Carrera.findOne(parent.carrera);
    return carrera;
  },
  amigos: async (parent) => {
    const amigos = await Usuario.find({ _id: { $in: parent.amigos } });
    return amigos;
  },
  chats: async (parent) => {
    const chats = await Chat.find({ _id: { $in: parent.chats } });
    return chats;
  },
  grupos: async (parent) => {
    const grupos = await Grupo.find({ _id: { $in: parent.grupos } });
    return grupos;
  },
  publicaciones: async (parent) => {
    const publicaciones = await Publicacion.find({
      _id: { $in: parent.publicaciones },
    });
    return publicaciones;
  },
  likes: async (parent) => {
    const likes = await Publicacion.find({ _id: { $in: parent.likes } });
    return likes;
  },
  comentarios: async (parent) => {
    const comentarios = await Publicacion.find({
      _id: { $in: parent.comentarios },
    });
    return comentarios;
  },
};

const CarreraNesting = {
  alumnos: async (parent) => {
    const alumnos = await Usuario.find({ _id: { $in: parent.alumnos } });
    return alumnos;
  },
};

const ChatNesting = {
  usuarios: async (parent) => {
    const usuarios = await Usuario.find({ _id: { $in: parent.usuarios } });
    return usuarios;
  },
  mensajes: async (parent) => {
    const mensajes = await Mensaje.find({ _id: { $in: parent.mensajes } });
    return mensajes;
  },
};

const MensajeNesting = {
  visto: async (parent) => {
    const visto = await Usuario.find({ _id: { $in: parent.visto } });
    return visto;
  },
};

const GrupoNesting = {
  miembros: async (parent) => {
    const miembros = await Usuario.find({ _id: { $in: parent.miembros } });
    return miembros;
  },
  chat: async (parent) => {
    const chats = await Chat.find({ _id: { $in: parent.chats } });
    return chats;
  },
    admins: async (parent) => {
    const admins = await Usuario.find({ _id: { $in: parent.admins } });
    return admins;
    },
  solicitudes: async (parent) => {
    const solicitudes = await Usuario.find({ _id: { $in: parent.solicitudes } });
    return solicitudes;
  },
  
};

module.exports = {
  UsuarioNesting,
  CarreraNesting,
  ChatNesting,
  MensajeNesting,
  GrupoNesting,
};
