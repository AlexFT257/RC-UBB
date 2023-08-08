import { gql } from "@apollo/client";
import { serverRequester } from "./graphqlManager.js";

export const ALL_REPORTES = `
    query {
        all_reportes {
            id
            titulo
            descripcion
            estado
        }
    }
`;

export const BUSCAR_REPORTE = `
    query buscarReporte($buscar: String!) {
        buscarReporte(buscar: $buscar) {
            id
            titulo
            descripcion
            estado
        }
    }
`;

export const BUSCAR_REPORTE_ID = `
    query buscarReporteId($id: ID!) {
        buscarReporteId(id: $id) {
            id
            titulo
            descripcion
            estado
        }
    }
`;

export const BUSCAR_REPORTE_USUARIO = `
    query buscarReporteUsuario($usuario: ID!) {
        buscarReporteUsuario(usuario: $usuario) {
            id
            titulo
            descripcion
            estado
        }
    }
`;

export const BUSCAR_REPORTE_TIPO = `
    query buscarReporteTipo($tipo: String!) {
        buscarReporteTipo(tipo: $tipo) {
            id
            titulo
            descripcion
            estado
        }
    }
`;

export const BUSCAR_REPORTE_FECHA_RANGO = `
    query buscarReporteFecha($fechaInicio: Date!, $fechaFin: Date!) {
        buscarReporteFecha(fechaInicio: $fechaInicio, fechaFin: $fechaFin) {
            id
            titulo
            descripcion
            estado
        }
    }
`;

export const BUSCAR_REPORTE_FECHA = `
    query buscarReporteFecha($fecha: Date!) {
        buscarReporteFecha(fecha: $fecha) {
            id
            titulo
            descripcion
            estado
        }
    }
`;

export const BUSCAR_REPORTE_ESTADO = `
    query buscarReporteEstado($estado: String!) {
        buscarReporteEstado(estado: $estado) {
            id
            titulo
            descripcion
            estado
        }
    }
`;

export const VERIFICAR_ADMIN = `
    query verifyAdmin($idAdmin: String!) {
        verifyAdmin(idAdmin: $idAdmin) {
            idAdmin
        }
    }
`;


export async function obtenerReportes() {
    try {
        const { all_reportes } = await serverRequester(ALL_REPORTES, {}, true);
        return all_reportes;
    } catch (error) {
        console.error("Error al obtener los reportes:", error);
        return [];
    }
}