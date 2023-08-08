const Calendario = require('../models/calendario.js');
const { UserInputError } = require('apollo-server-errors');
const Usuario = require('../models/usuario.js'); // Asegúrate de importar tu modelo de usuario aquí


const mutations = {
  crearEvento: async (root, args) => {
    try {
      // Crear el evento principal con tipo "creador"
      const evento = new Calendario({
        ...args,
        tipo: "creador",
      });
      await evento.save();
  
      // Crear eventos para cada invitado con tipo "invitado"
      if (args.invitados && args.invitados.length > 0) {
        const invitadosEventos = await Promise.all(args.invitados.map(async (invitado) => {
          // Obtener el ID del usuario invitado
          const invitadoUsuario = await Usuario.findOne({ correo: invitado });
          if (!invitadoUsuario) {
            throw new UserInputError(`Usuario invitado no encontrado para el correo: ${invitado}`);
          }
  
          return new Calendario({
            ...args,
            titulo: `${args.titulo}`,
            descripcion: "(Invitado) " + args.descripcion,
            creador: invitadoUsuario._id, // Asignar el ID del usuario invitado al campo "creador"
            invitados: [],
            tipo: "invitado",
          });
        }));
  
        await Calendario.insertMany(invitadosEventos);
      }
  
      return evento;
    } catch (error) {
      throw new UserInputError(error.message, {
        invalidArgs: args,
      });
    }
  },

  editarEvento: async (root, args) => {
    try {
      const evento = await Calendario.findById(args.id);
      if (!evento) {
        return null;
      }
  
      // Verificar y actualizar solo las propiedades que se proporcionaron en los argumentos
      if (args.titulo) {
        evento.set({ titulo: args.titulo });
      }
      if (args.fecha_inicio) {
        evento.set({ fecha_inicio: args.fecha_inicio });
      }
      if (args.fecha_fin) {
        evento.set({ fecha_fin: args.fecha_fin });
      }
      if (args.descripcion) {
        evento.set({ descripcion: args.descripcion });
      }
      if (args.creador) {
        evento.set({ creador: args.creador });
      }
      if (args.invitados) {
        evento.set({ invitados: args.invitados });
      }
  
      await evento.save();
      return evento;
    } catch (error) {
      throw new UserInputError(error.message, {
        invalidArgs: args,
      });
    }
  },
  
      
eliminarEvento: async (root, args) => {
    try {
        const evento = await Calendario.findById(args.id)
        if( !evento ) {
            return null
        }
        await evento.remove()
        return evento
    } catch (error) {
        throw new UserInputError(error.message, {
            invalidArgs: args
        })
    }
}
}

module.exports = mutations;