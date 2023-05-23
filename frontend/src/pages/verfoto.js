import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

const BUSCAR_USUARIO = gql`
  query BuscarUsuario($buscar: String!) {
    buscarUsuario(buscar: $buscar) {
      nombre
      apellido
      foto_perfil
    }
  }
`;

export default function BuscarUsuarioComponent() {
    const [buscarTexto, setBuscarTexto] = useState("");
    const { data: usuariosData, loading: usuariosLoading } = useQuery(BUSCAR_USUARIO, {
        variables: { buscar: buscarTexto },
        skip: !buscarTexto,
    });

    const handleBuscarChange = (event) => {
        setBuscarTexto(event.target.value);
    };

    return (
        <div>
            <div>
                <input
                    id="buscarInput"
                    type="text"
                    value={buscarTexto}
                    onChange={handleBuscarChange}
                    placeholder="Buscar usuario"
                />
            </div>
            <div>
                {/* Mostrar los resultados de la búsqueda */}
                {usuariosLoading ? (
                    <p>Cargando usuarios...</p>
                ) : (
                    usuariosData && usuariosData.buscarUsuario && usuariosData.buscarUsuario.length > 0 ? (
                        usuariosData.buscarUsuario.map((usuario) => (
                            <div key={usuario.id}>
                                <p>Nombre: {usuario.nombre}</p>
                                <p>Apellido: {usuario.apellido}</p>
                                <p>Foto: {usuario.foto_perfil}</p>
                                <img src={`${usuario.foto_perfil}`} alt="Foto de perfil" />

                            </div>
                        ))
                    ) : (
                        <p>No se encontraron usuarios.</p>
                    )
                )}
            </div>
        </div>
    );
}
