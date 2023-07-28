const { UserInputError } = require('apollo-server-express');
const Grupo = require('../models/grupo.js');

const mutations = {
    crearGrupo: async (root, args) => {
        const grupo = new Grupo({ ...args });
        try {
            await grupo.save();
            return grupo;
        } catch (error) {
            throw new UserInputError(error.message, {
                invalidArgs: args,
            });
        }
    },
    editarGrupo: async (root, args) => {
        let grupo = await Grupo.findById(args.id)
        if (!grupo) {
            return null;
        }
        try{
            grupo.nombre = args.nombre || grupo.nombre;
            grupo.privacidad = args.privacidad || grupo.privacidad;
            grupo.vencimiento = args.vencimiento || grupo.vencimiento;
            grupo.descripcion = args.descripcion || grupo.descripcion;
            grupo.admins = args.admins || grupo.admins;
            grupo.miembros = args.miembros || grupo.miembros;
            grupo.icono = args.icono || grupo.icono;
            grupo.banner = args.banner || grupo.banner;
            await grupo.save();
            return grupo;
        }
        catch (error) {
            throw new UserInputError(error.message, {
                invalidArgs: args,
            });
        }
    },
    eliminarGrupo: async (root, args) => {
        const grupo = await Grupo.findById(args.id);
        try {
            await Grupo.findByIdAndDelete(args.id);
            return grupo;
        } catch (error) {
            throw new UserInputError(error.message, {
                invalidArgs: args,
            });
        }
    },
    agregarAdmins: async (root, args) => {
        const grupo = await Grupo.findById(args.id);
        const admins = args.admins;
        try {
            admins.forEach(admin => {
                grupo.admins.push(admin);
            });
            await grupo.save();
            return grupo;
        }
        catch (error) {
            throw new UserInputError(error.message, {
                invalidArgs: args,
            });
        }
    },
    agregarMiembros: async (root, args) => {
        const grupo = await Grupo.findById(args.idGrupo);
        const miembros = args.miembros;
        try {
            miembros.forEach(miembro => {
                grupo.miembros.push(miembro);
            });
            await grupo.save();
            return grupo;
        }
        catch (error) {
            throw new UserInputError(error.message, {
                invalidArgs: args,
            });
        }
    },
    eliminarAdmins: async (root, args) => {
        const grupo = await Grupo.findById(args.idGrupo);
        const admins = args.admins;
        try {
            admins.forEach(admin => {
                grupo.admins.pull(admin);
            });
            await grupo.save();
            return grupo;
        }
        catch (error) {
            throw new UserInputError(error.message, {
                invalidArgs: args,
            });
        }
    },
    eliminarMiembros: async (root, args) => {
        const grupo = await Grupo.findById(args.idGrupo);
        const miembros = args.miembros;
        try {
            miembros.forEach(miembro => {
                grupo.miembros.pull(miembro);
            });
            await grupo.save();
            return grupo;
        }
        catch (error) {
            throw new UserInputError(error.message, {
                invalidArgs: args,
            });
        }
    },
    solicitarUnirse: async (root, args) => {
        const grupo = await Grupo.findById(args.idGrupo);
        const usuario = args.idUsuario;
        console.log("grupo",grupo);
        console.log("usuario",usuario);
        try {
            if(grupo.privacidad === 'publico'){
                grupo.miembros.push(usuario);
                // await grupo.save();
                await grupo.save();
                return grupo;
            } else if(grupo.privacidad === 'privado'){
                grupo.solicitudes.push(usuario);
                await grupo.save();
                return grupo;
            }
        } catch (error) {
            throw new UserInputError(error.message, {
                invalidArgs: args,
            });
        }

        
    },
};

module.exports = mutations;