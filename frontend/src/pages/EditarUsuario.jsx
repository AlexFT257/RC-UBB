import { useState, useContext, useEffect } from "react";
import Head from "next/head";
import { useTheme } from "next-themes";
import { UserContext } from "../utils/userContext";
import { useRouter } from "next/router";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useApolloClient } from "@apollo/client";
import Home from "../components/Home";
const EditarUsuarioPage = ({ screenWidth }) => {
  const { resolvedTheme, setTheme } = useTheme();
  const client = useApolloClient();
  const router = useRouter();
  const { user, userInfo } = useContext(UserContext);

  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoApellido, setNuevoApellido] = useState("");
  const [nuevoCorreo, setNuevoCorreo] = useState("");
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [nuevaCarreraId, setNuevaCarreraId] = useState("");
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [correoError, setCorreoError] = useState("");
  const [carreraActualId, setCarreraActualId] = useState("");

  const [edicionExitosa, setEdicionExitosa] = useState(false);
  const [mostrarMensajeExito, setMostrarMensajeExito] = useState(false);
  const [edicionFallida, setEdicionFallida] = useState(false);
  const [mostrarMensajeFallido, setMostrarMensajeFallido] = useState(false);
  const GET_CARRERAS = gql`
  query {
    all_carreras {
      id
      nombre
    }
  }
`;
  const { data: carrerasData } = useQuery(GET_CARRERAS);
  const EDITAR_USUARIO = gql`
mutation editarUsuario(
  $id: ID
  $nombre: String
  $apellido: String
  $correo: String
  $contrasena: String
  $carreraId: ID
  $foto_perfil: String
) {
  editarUsuario(
    id: $id
    nombre: $nombre
    apellido: $apellido
    correo: $correo
    contrasena: $contrasena
    carrera: $carreraId
    foto_perfil: $foto_perfil
  ) {
    id
    nombre
    apellido
    correo
    carrera {
      id
    }
  }
}
`;
  const GET_CORREOS_REGISTRADOS = gql`
query {
  all_usuarios {
    correo
  }
}
`;
  const { data: correosRegistradosData } = useQuery(GET_CORREOS_REGISTRADOS);
  const correosRegistrados = correosRegistradosData ? correosRegistradosData.all_usuarios.map(user => user.correo) : [];

  const ELIMINAR_USUARIO = gql`
   mutation eliminarUsuario($id:ID) {
    
     eliminarUsuario(id:$id) {
       nombre
       apellido
       correo
       carrera {
         id
       }
     }
   }
 `;

  useEffect(() => {
    if (!user) {
      userInfo()

    }

  }, []
  )
  // Declarar la constante EDITAR_USUARIO antes de utilizarla en useMutation


  const [editarUsuario] = useMutation(EDITAR_USUARIO);
  const [eliminarUsuario] = useMutation(ELIMINAR_USUARIO);

  const validateForm = () => {
    // ... (código existente)

    // Verificar si el correo ya está registrado
    if (correosRegistrados.includes(nuevoCorreo)) {
      // Si el correo es igual al correo actual del usuario, no mostrar el mensaje de error
      if (user && nuevoCorreo === user.correo) {
        setCorreoError("");
      } else {
        setCorreoError("El correo ya está registrado con otra cuenta");
        return false;
      }
    }



    // Si todas las validaciones pasan, el formulario es válido
    return true;
  };

  useEffect(() => {
    // Usar los datos del contexto para llenar el formulario
    if (user) {
      const { nombre, apellido, correo } = user;
      setNuevoNombre(nombre);

      setNuevoApellido(apellido);


      setNuevoCorreo(correo);

      if (carrera) {
        setCarreraActualId(carrera.id);

      }

    }
  }, [user]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCorreoError("");
    if (!validateForm()) {
      return;
    }
    try {
      const { data } = await editarUsuario({
        variables: {
          id: user.id,
          nombre: nuevoNombre,
          apellido: nuevoApellido,
          correo: nuevoCorreo,
          contrasena: nuevaContrasena,
          carreraId: nuevaCarreraId,
          foto_perfil: nuevaFoto ? nuevaFoto : user.foto_perfil,
        },
      });

      setEdicionExitosa(true);
      setMostrarMensajeExito(true);
      console.log("Usuario editado:", data.editarUsuario);
    } catch (error) {
      if (error.message.includes("Ya existe un usuario con este correo")) {
        setCorreoError("El correo ya está registrado");
      } else {
        console.error("Error al editar usuario:", error.message);

      }
      setEdicionFallida(true);
      setMostrarMensajeFallido(true);
    }
  };
  useEffect(() => {
    if (mostrarMensajeExito) {
      // Ocultar el mensaje de éxito después de 3 segundos
      const timeoutId = setTimeout(() => {
        setMostrarMensajeExito(false);
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }

  }, [mostrarMensajeExito]);

  useEffect(() => {
    if (mostrarMensajeFallido) {
      const timeoutId = setTimeout(() => {
        setMostrarMensajeFallido(false);
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [mostrarMensajeFallido]);




  const handleCerrarSesion = () => {
    Cookies.remove("user");
    client.clearStore();
    router.push("/login");
  };

  const handleEliminarUsuario = async () => {
    const { data } = await eliminarUsuario({
      variables: {
        id: user.id
      },
    });

    try {
      await eliminarUsuario();

      Cookies.remove("user");

      router.push("/login");
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };


  const [nuevaFoto, setNuevaFoto] = useState("");


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNuevaFoto(reader.result); // Actualiza el estado con la nueva foto
      };
      reader.readAsDataURL(file);
    }
  };





  return (
    <>



      <main>
        <div className="flex flex-col items-center justify-center h-screen ">

          <button
            onClick={handleCerrarSesion}
            className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded"
          >
            Cerrar sesión
          </button>
          <div className="max-w-md mx-auto mt-20 bg-foreground p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 flex items-center justify-center">Editar Usuario</h2>
            <div className="m-2 flex flex-col items-center justify-center gap-2">
              <div>
              {nuevaFoto && ( 
                <img
                  src={nuevaFoto}
                  alt="Foto Perfil"
                  className="rounded-lg border shadow-lg"
                  height={200}
                  width={200}
                />
              )}
              </div>
              <div className="flex flex-col items-center justify-center">
                <label htmlFor="imageUpload" className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg">
                  Subir Foto
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 bg-foreground">
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
                {correoError && <div className="text-red-500">{correoError}</div>}
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
              <label htmlFor="carrera" className="block font-medium">
                Carrera:
              </label>
              <select
                id="carrera"
                value={nuevaCarreraId} // Ahora utiliza nuevaCarreraId como valor inicial
                onChange={(e) => setNuevaCarreraId(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              >
                <option value="">Selecciona una carrera...</option>
                {carrerasData &&
                  carrerasData.all_carreras.map((carrera) => (
                    <option key={carrera.id} value={carrera.id}>
                      {carrera.nombre}
                    </option>
                  ))}
              </select>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
              >
                Guardar Cambios
              </button>
              {mostrarMensajeExito && (
                <div className="bg-green-500 text-white font-bold p-2 rounded mt-4">
                  ¡La edición del usuario fue exitosa!
                </div>
              )}
              {mostrarMensajeFallido && (
                <div className="bg-green-500 text-white font-bold p-2 rounded mt-4">
                  ¡La edición del usuario a fallado!
                </div>
              )}
            </form>
            <div className="flex justify-between mt-4">
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
        </div>
      </main>
    </>
  );
}
EditarUsuarioPage.getLayout = function getLayout(page, screenWidth) {
  return <Home screenWidth={screenWidth}>{page}</Home>;
};

export default EditarUsuarioPage;