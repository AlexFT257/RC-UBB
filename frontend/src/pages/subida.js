import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";

const SUBIR_FOTO_PERFIL = gql`
  mutation SubirFotoPerfil($usuarioId: ID!, $foto: String!) {
    subirFotoPerfil(id: $usuarioId, foto_perfil: $foto) {
      id
      foto_perfil
    }
  }
`;

const VER_FOTO_PERFIL = gql`
  query VerFotoPerfil($usuarioId: ID!) {
    verfotodePerfil(id: $usuarioId)
  }
`;

export default function SubirFotoPerfilComponent() {
  const [usuarioId, setUsuarioId] = useState("");
  const [subirFotoPerfil] = useMutation(SUBIR_FOTO_PERFIL);
  const { data: fotoPerfilData, loading: fotoPerfilLoading, refetch: refetchFotoPerfil } = useQuery(
    VER_FOTO_PERFIL,
    {
      variables: { usuarioId },
      skip: !usuarioId, // Evita realizar la consulta si no se ha proporcionado el usuarioId
    }
  );

  const handleFotoChange = (event) => {
    const foto = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const fotoBase64 = reader.result;
      console.log("Foto en base64:", fotoBase64);

      subirFotoPerfil({ variables: { usuarioId, foto: fotoBase64 } });
    };
    reader.readAsDataURL(foto);
  };

  const handleInputChange = (event) => {
    setUsuarioId(event.target.value);
  };

  const handleEnviarClick = () => {
    const inputElement = document.getElementById("fotoInput");
    inputElement.click();
  };

  const handleBuscarClick = () => {
    refetchFotoPerfil(); // Vuelve a realizar la consulta para obtener la foto actualizada según el ID
  };

  let fotoPerfilSrc = null;
  if (fotoPerfilLoading) {
    fotoPerfilSrc = "Cargando..."; // Mostrar mensaje de carga mientras se obtiene la foto
  } else if (fotoPerfilData) {
    const fotoBase64 = fotoPerfilData.verfotodePerfil;
    fotoPerfilSrc = `data:image/jpeg;base64,${fotoBase64}`;
  }

  return (
    <div>
      <div>
        <h3>Buscar usuario:</h3>
        <input
          id="usuarioIdInput"
          type="text"
          value={usuarioId}
          onChange={handleInputChange}
          placeholder="ID del usuario"
        />
        <button onClick={handleBuscarClick}>Buscar</button>
      </div>
      <div>
        <h3>Subir foto de perfil:</h3>
        <input id="fotoInput" type="file" onChange={handleFotoChange} style={{ display: "none" }} />
        <button onClick={handleEnviarClick}>Enviar</button>
      </div>
      <div>
        <h3>Foto de perfil:</h3>
        {fotoPerfilSrc && <img src={fotoPerfilSrc} alt="Foto de perfil" />}
      </div>
    </div>
  );
}
