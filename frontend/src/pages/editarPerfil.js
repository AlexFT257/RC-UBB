import { gql, useMutation, useQuery } from "@apollo/client";

export default function EditarPerfil() {




  const SUBIR_FOTO_PERFIL = gql`
  mutation SubirFotoPerfil($usuarioId: ID!, $foto: String!) {
    subirFotoPerfil(id: $usuarioId, foto_perfil: $foto) {
      id
      foto_perfil
    }
  }
`;






  return (
    <div className="container">
      <div className="profile">
        <div className="profile-picture"></div>
        <input type="text" placeholder="Nombre" />
        <input type="text" placeholder="Apellido" />
      </div>
    </div>
  )

}