const { UserInputError } = require('apollo-server-express');
const Usuario = require('../models/usuario.js');
const Grupo = require('../models/grupo.js');

const mutations = {
    crearGrupo: async (root, args) => {
        const grupo = new Grupo({ ...args });
        console.log("GRUPO",grupo.admins[0]._id);
        try {
            const user = await Usuario.findById(grupo.admins[0]._id);
            console.log("USER",user);
            await grupo.save();
            user.grupos.push(grupo.id);
            await user.save();
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
            admins.forEach( async (admin) => {
                grupo.admins.push(admin);
                const user = await Usuario.findById(admin);
                user.grupos.push(args.idGrupo);
                await user.save();
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
            miembros.forEach( async(miembro) => {
                grupo.miembros.push(miembro);
                const user = await Usuario.findById(miembro);
                console.log("USER",user);
                user.grupos?.push(args.idGrupo);
                await user.save();
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
        const admin = args.admins;
        try {
                grupo.admins.pull(admin);
                const user = await Usuario.findById(admin);//NO EXISTE
                user.grupos?.pull(args.idGrupo);
                await user.save();
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
        const miembro = args.miembros;
        try {
                grupo.miembros.pull(miembro);
                const user = await Usuario.findById(miembro);
                console.log("USER",user);
                user.grupos?.pull(args.idGrupo);
                await user.save();
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