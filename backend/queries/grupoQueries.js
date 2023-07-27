const Grupo = require('../models/grupo.js');

const grupoQueries = {
    all_grupos: async () => {
        const grupos = await Grupo.find({});
        return grupos;
    },
    buscarGrupo: async (root, args) => {
        const grupo = await Grupo.find({ nombre: { $regex: args.buscar, $options: 'i' } });
        return grupo;
    },
    buscarGrupoId: async (root, args) => {
        const grupo = await Grupo.findById(args.id);
        return grupo;
    },
    buscarGrupoUsuario: async (root, args) => {
        const grupoAdmin = await Grupo.find({ admins: args.usuario });
        const grupoMiembro = await Grupo.find({ miembros: args.usuario });
        const grupo = grupoAdmin.concat(grupoMiembro);
        console.log(grupo);
        // const grupo = await Grupo.find({ miembros: args.usuario, admins: args.usuario });
        return grupo;
    },
    buscarGrupoAdmin: async (root, args) => {
        const grupo = await Grupo.find({ admin: args.admin });
        return grupo;
    }
}

module.exports = { grupoQueries };