const { UserInputError } = require('apollo-server');
const reporte = require('../models/reporte.js');

const reporteQueries = {

    all_reportes: async () => {
        const reportes = await reporte.find({});
        return reportes;
    },
    buscarReporte: async (root, args) => {
        const reportes = await reporte.find({
            $or: [
                { titulo: { $regex: args.buscar, $options: 'i' } },
                { descripcion: { $regex: args.buscar, $options: 'i' } },
                { estado: { $regex: args.buscar, $options: 'i' } },
            ]
        });
        return reportes;
    },
    buscarReporteId: async (root, args) => {
        const reportes = await reporte.findById(args.id);
        return reportes;
    },
    buscarReporteUsuario: async (root, args) => {
        const reportes = await reporte.find({ usuario: args.usuario });
        return reportes;
    },
    buscarReporteTipo: async (root, args) => {
        const reportes = await reporte.find({ tipo: args.tipo });
        return reportes;
    },
    buscarReporteFecha: async (root, args) => {
        let query = {};
        if (args.fechaInicio && args.fechaFin) {
            query.fecha = { $gte: args.fechaInicio, $lte: args.fechaFin };
        } else if (args.fecha) {
            query.fecha = args.fecha;
        } else {
            return [];
        }
        const reportes = await reporte.find(query);
        return reportes;
    },
    buscarReporteEstado: async (root, args) => {
        const reportes = await reporte.find({ estado: args.estado });
        return reportes;
    }
}

module.exports = { reporteQueries };