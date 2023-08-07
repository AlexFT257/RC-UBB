import { useState, useContext, useEffect } from "react";
import Head from "next/head";
import { useTheme } from "next-themes";
import { UserContext } from "../utils/userContext";
import { useRouter } from "next/router";
import { gql, useMutation, useQuery } from "@apollo/client";
import Cookies from "js-cookie";
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
) {
  editarUsuario(
    id: $id
    nombre: $nombre
    apellido: $apellido
    correo: $correo
    contrasena: $contrasena
    carrera: $carreraId
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


  const [editarUsuario] = useMutation(EDITAR_USUARIO);
  const [eliminarUsuario] = useMutation(ELIMINAR_USUARIO);
  

  const validateForm = () => {
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
    const nameRegex = /\d/;
    if (nameRegex.test(nombre)) {
      setNombreError("El nombre no debe contener números");
      return false;
    }
    if (nameRegex.test(apellido)) {
      setApellidoError("El apellido no debe contener números");
      return false;
    }

    // Verificar si el correo es válido
    

    const emailRegex = /^[a-zA-Z0-9._%+-]+@alumnos\.ubiobio\.cl$/i;
    if (!emailRegex.test(nuevoCorreo)) {
      setCorreoError("El correo ingresado no es válido");
      return false;
    }

    // Verificar si la contraseña tiene al menos 8 caracteres y una letra mayúscula
    if (contrasena.length < 8 || !/[A-Z]/.test(contrasena)) {
      setContrasenaError("La contraseña debe tener al menos 8 caracteres y una letra mayúscula");
      return false;
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
          carreraId: nuevaCarreraId
        },
      });

      setEdicionExitosa(true);
      setMostrarMensajeExito(true);
      console.log("Usuario editado:", data.editarUsuario);
    } catch (error) {
      if (error.message.includes("Ya existe un usuario con este correo")) {
        setEdicionFallida(true);
        setMostrarMensajeFallido(true);
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
  return (
    <>



      <main>
        <div className="flex flex-col items-center justify-center h-screen ">

          
          <div className="max-w-md mx-auto mt-20 bg-foreground p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Editar Usuario</h2>
            <form onSubmit={handleSubmit} className="space-y-4 bg-foreground">
              <div>
                <input
                  type="text"
                  id="nombre"
                  value={nuevoNombre}
                  onChange={(e) => setNuevoNombre(e.target.value)}
                  className="my-2 w-5/6 max-w-[400px] rounded-[10px] bg-background p-2  placeholder-secondary outline-none focus:outline-secondary w-full"
                  placeholder="Nombre"
                />
              </div>
              <div>
                <input
                  type="text"
                  id="apellido"
                  value={nuevoApellido}
                  onChange={(e) => setNuevoApellido(e.target.value)}
                  className="my-2 w-5/6 max-w-[400px] rounded-[10px] bg-background p-2  placeholder-secondary outline-none focus:outline-secondary w-full"
                  placeholder="Apellido"
                />
              </div>
              <div>
                <input
                  type="email"
                  id="correo"
                  value={nuevoCorreo}
                  onChange={(e) => setNuevoCorreo(e.target.value)}
                  className="my-2 w-5/6 max-w-[400px] rounded-[10px] bg-background p-2  placeholder-secondary outline-none focus:outline-secondary w-full"
                  placeholder="Correo"
                />
                {correoError && <div className="text-red-500">{correoError}</div>}
              </div>
              <div>
                <input
                  type="password"
                  id="contrasena"
                  value={nuevaContrasena}
                  onChange={(e) => setNuevaContrasena(e.target.value)}
                  className="my-2 w-5/6 max-w-[400px] rounded-[10px] bg-background p-2  placeholder-secondary outline-none focus:outline-secondary w-full"
                  placeholder="Contraseña"
                />
              </div>
              <select
                id="carrera"
                value={nuevaCarreraId} // Ahora utiliza nuevaCarreraId como valor inicial
                onChange={(e) => setNuevaCarreraId(e.target.value)}
                className="my-2 w-5/6 max-w-[400px] rounded-[10px] bg-background p-2  placeholder-secondary outline-none focus:outline-secondary w-full"
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
                <div className="bg-red-500 text-white font-bold p-2 rounded mt-4">
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

