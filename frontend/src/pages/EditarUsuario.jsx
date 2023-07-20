import { useState, useEffect  } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import withAuth from "../middleware/withAuth";
import { useApolloClient } from "@apollo/client";
const EDITAR_USUARIO = gql`
  mutation editarUsuario(
    $nombre: String
    $apellido: String
    $correo: String
    $contrasena: String
  ) {
    editarUsuario(
      nombre: $nombre
      apellido: $apellido
      correo: $correo
      contrasena: $contrasena
    ) {
      nombre
      apellido
      correo
    }
  }
`;

const ELIMINAR_USUARIO = gql`
  mutation eliminarUsuario {
    eliminarUsuario {
      nombre
      apellido
      correo
      carrera {
        id
      }
    }
  }
`;
const BUSCAR_USUARIO_ACTUAL = gql`
  query {
    buscarUsuarioActual {
      nombre
      apellido
      correo
    }
  }
`;
const EditarUsuarioPage = () => {
  const client = useApolloClient();
  const router = useRouter();
  const { loading, error, data } = useQuery(BUSCAR_USUARIO_ACTUAL);
  const [editarUsuario] = useMutation(EDITAR_USUARIO);
  const [eliminarUsuario] = useMutation(ELIMINAR_USUARIO);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoApellido, setNuevoApellido] = useState("");
  const [nuevoCorreo, setNuevoCorreo] = useState("");
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  useEffect(() => {
    if (data && data.buscarUsuarioActual) {
      const { nombre, apellido, correo } = data.buscarUsuarioActual;
      setNuevoNombre(nombre);
      setNuevoApellido(apellido);
      setNuevoCorreo(correo);
    }
  }, [data]);

  const handleCerrarSesion = () => {
    Cookies.remove("token");
   
    client.clearStore();
    router.push("/login");
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await editarUsuario({
        variables: {
          nombre: nuevoNombre,
          apellido: nuevoApellido,
          correo: nuevoCorreo,
          contrasena: nuevaContrasena,
        },
      });

      console.log("Usuario editado:", data.editarUsuario);
    } catch (error) {
      console.error("Error al editar usuario:", error);
    }
  };

  const handleEliminarUsuario = async () => {
    try {
      await eliminarUsuario();

      // Eliminar la cookie de autenticación
      Cookies.remove("token");

      // Redireccionar a la página de inicio de sesión u otra página deseada
      router.push("/login");
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error al cargar los datos del usuario</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Editar Usuario</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nombre" className="block font-medium">
            Nombre:
          </label>
          <input
            type="text"
            id="nombre"
            value={nuevoNombre}
            onChange={(e) => setNuevoNombre(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="apellido" className="block font-medium">
            Apellido:
          </label>
          <input
            type="text"
            id="apellido"
            value={nuevoApellido}
            onChange={(e) => setNuevoApellido(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="correo" className="block font-medium">
            Correo:
          </label>
          <input
            type="email"
            id="correo"
            value={nuevoCorreo}
            onChange={(e) => setNuevoCorreo(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="contrasena" className="block font-medium">
            Contraseña:
          </label>
          <input
            type="password"
            id="contrasena"
            value={nuevaContrasena}
            onChange={(e) => setNuevaContrasena(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
        >
          Guardar Cambios
        </button>
      </form>

      <div className="flex justify-between mt-4">
        <button
          onClick={handleCerrarSesion}
          className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded"
        >
          Cerrar sesión
        </button>

        {!mostrarConfirmacion ? (
          <button
            onClick={() => setMostrarConfirmacion(true)}
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded"
          >
            Eliminar cuenta
          </button>
        ) : (
          <div className="mt-4">
            <p>¿Estás seguro que deseas eliminar tu cuenta?</p>
            <button
              onClick={handleEliminarUsuario}
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded mt-2"
            >
              Confirmar eliminación
            </button>
            <button
              onClick={() => setMostrarConfirmacion(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded mt-2"
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default withAuth(EditarUsuarioPage);