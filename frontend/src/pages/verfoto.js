import { gql, useLazyQuery } from "@apollo/client";
import { useState } from "react";

const BUSCAR_USUARIO_POR_ID = gql`
  query BuscarUsuarioPorId($id: ID!) {
    buscarUsuarioPorId(id: $id) {
      nombre
      apellido
      foto_perfil
    }
  }
`;

export default function BuscarUsuarioComponent() {
  const [buscarId, setBuscarId] = useState("");
  const [buscarUsuarioPorId, { data: usuarioData, loading: usuarioLoading }] =
    useLazyQuery(BUSCAR_USUARIO_POR_ID);

  const handleBuscarChange = (event) => {
    setBuscarId(event.target.value);
  };

  const handleBuscarClick = () => {
    buscarUsuarioPorId({ variables: { id: buscarId } });
  };

  return (
    <div>
      <div>
        <input
          id="buscarInput"
          type="text"
          value={buscarId}
          onChange={handleBuscarChange}
          placeholder="Buscar usuario por ID"
        />
        <button onClick={handleBuscarClick}>Buscar</button>
      </div>
      <div>
        {/* Mostrar el resultado de la búsqueda */}
        {usuarioLoading ? (
          <p>Cargando usuario...</p>
        ) : usuarioData && usuarioData.buscarUsuarioPorId ? (
          <div>
            <p>Nombre: {usuarioData.buscarUsuarioPorId.nombre}</p>
            <p>Apellido: {usuarioData.buscarUsuarioPorId.apellido}</p>
            <p>Foto: {usuarioData.buscarUsuarioPorId.foto_perfil}</p>
            <img
              src={`${usuarioData.buscarUsuarioPorId.foto_perfil}`}
              alt="Foto de perfil"
            />
          </div>
        ) : (
          <p>No se encontró ningún usuario con ese ID.</p>
        )}
      </div>
    </div>
  );
}
