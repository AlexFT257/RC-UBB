import { useState, useContext, useEffect } from "react";
import Head from "next/head";
import { useTheme } from "next-themes";
import { UserContext } from "../utils/userContext";
import { useRouter } from "next/router";
import { gql, useMutation, useQuery } from "@apollo/client";
import Cookies from "js-cookie";
import { useApolloClient } from "@apollo/client";
import Home from "../components/Home";
import {AiOutlineClose} from "react-icons/ai";


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
  const [contrasenaError, setContrasenaError] = useState("");
  const [nombreError, setNombreError] = useState("");
  const [apellidoError, setApellidoError] = useState("");
  const [carreraError, setcarreraError] = useState("");
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
  const correosRegistrados = correosRegistradosData
    ? correosRegistradosData.all_usuarios.map((user) => user.correo)
    : [];

  const ELIMINAR_USUARIO = gql`
    mutation eliminarUsuario($id: ID) {
      eliminarUsuario(id: $id) {
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
      userInfo();
    }
  }, []);

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
    if (nameRegex.test(nuevoNombre)) {
      setNombreError("El nombre no debe contener números");
      return false;
    }
    if (nameRegex.test(nuevoApellido)) {
      setApellidoError("El apellido no debe contener números");
      return false;
    }

    // Verificar si el correo es válido

    const emailRegex = /^[a-zA-Z0-9._%+-]+@alumnos\.ubiobio\.cl$/i;
    if (!emailRegex.test(nuevoCorreo)) {
      setCorreoError("El correo ingresado no es válido");
      return false;
    }

    if (nuevaContrasena.trim() !== "") {
      // Verificar si la contraseña tiene al menos 8 caracteres y una letra mayúscula
      if (nuevaContrasena.length < 8 || !/[A-Z]/.test(nuevaContrasena)) {
        setContrasenaError(
          "La contraseña debe tener al menos 8 caracteres y una letra mayúscula"
        );
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
  useEffect(() => {
    if (nombreError) {
      const timeoutId = setTimeout(() => {
        setNombreError(false);
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [nombreError]);
  useEffect(() => {
    if (nombreError) {
      const timeoutId = setTimeout(() => {
        setNombreError(false);
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [nombreError]);
  useEffect(() => {
    if (apellidoError) {
      const timeoutId = setTimeout(() => {
        setApellidoError(false);
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [apellidoError]);
  useEffect(() => {
    if (contrasenaError) {
      const timeoutId = setTimeout(() => {
        setApellidoError(false);
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [contrasenaError]);

  const handleEliminarUsuario = async () => {
    const { data } = await eliminarUsuario({
      variables: {
        id: user.id,
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
        let showAlert = false; // Inicializar en falso para no mostrar alerta por defecto

        if (file.size > 700 * 1024) {
            window.alert('La imagen supera los 700 KB de tamaño.');
            showAlert = true;
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setNuevaFoto(reader.result); 
        };
        reader.readAsDataURL(file);
    }
};

const handleImageDelete = () => {
  setNuevaFoto(null); 
};

  return (
    <>
      <main>
        <div className="flex h-screen flex-col items-center justify-center ">
          <div className="mx-auto mt-20 rounded-lg bg-foreground p-6 shadow-lg px-[3vw] w-[50vw] min-w-[400px] flex flex-col items-center justify-center">
            <h2 className="mb-4 text-2xl font-bold">Editar Usuario</h2>
            <div className="m-2 flex flex-col items-center justify-center gap-2">
            <div>
        {nuevaFoto && (
            <div className="relative">
                <img
                    src={nuevaFoto}
                    alt="Foto Perfil"
                    className="rounded-lg border shadow-lg"
                    height={200}
                    width={200}
                />
                <button
                    onClick={handleImageDelete}
                    className="right absolute top-0 rounded-full p-1 text-white hover:bg-primary"
                >
                    <AiOutlineClose />
                </button>
            </div>
        )}
              </div>
              <div className="flex flex-col items-center justify-center">
                <label
                  htmlFor="imageUpload"
                  className="bg-accent hover:bg-background px-4 py-2 rounded-[10px] font-bold mx-auto cursor-pointer"
                  
                >
                  Subir Foto
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
              <div >
                <input
                  type="text"
                  id="nombre"
                  value={nuevoNombre}
                  onChange={(e) => setNuevoNombre(e.target.value)}
                  className="my-2 w-[30vw] rounded-[10px] bg-background  p-2 placeholder-secondary outline-none focus:outline-secondary"
                  placeholder="Nombre"
                />
                {nombreError && (
                  <div className="text-red-500">{nombreError}</div>
                )}
              </div>
              <div >
                <input
                  type="text"
                  id="apellido"
                  value={nuevoApellido}
                  onChange={(e) => setNuevoApellido(e.target.value)}
                  className="my-2 w-[30vw] rounded-[10px] bg-background  p-2 placeholder-secondary outline-none focus:outline-secondary"
                  placeholder="Apellido"
                />
                {apellidoError && (
                  <div className="text-red-500">{apellidoError}</div>
                )}
              </div>
              <div >
                <input
                  type="email"
                  id="correo"
                  value={nuevoCorreo}
                  onChange={(e) => setNuevoCorreo(e.target.value)}
                  className="my-2 w-[30vw] rounded-[10px] bg-background  p-2 placeholder-secondary outline-none focus:outline-secondary"
                  placeholder="Correo"
                />
                {correoError && (
                  <div className="text-red-500">{correoError}</div>
                )}
              </div>
              <div >
                <input
                  type="password"
                  id="contrasena"
                  value={nuevaContrasena}
                  onChange={(e) => setNuevaContrasena(e.target.value)}
                  className="my-2 w-[30vw]  rounded-[10px] bg-background  p-2 placeholder-secondary outline-none focus:outline-secondary"
                  placeholder="Contraseña"
                />
                {contrasenaError && (
                  <div className="text-red-500">{contrasenaError}</div>
                )}
              </div >
              <select 
                id="carrera"
                value={nuevaCarreraId} // Ahora utiliza nuevaCarreraId como valor inicial
                onChange={(e) => setNuevaCarreraId(e.target.value)}
                className="my-2 w-[30vw] rounded-[10px] bg-background mb-[100px] p-2 placeholder-secondary outline-none focus:outline-secondary"
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
                className="bg-primary self-center text-foreground hover:bg-background hover:text-primary px-4 py-2 rounded-[10px] font-bold mx-auto"
              >
                Guardar Cambios
              </button>

              {mostrarMensajeExito && (
                <div className="mt-4 rounded bg-green-500 p-2 font-bold text-white">
                  ¡La edición del usuario fue exitosa!
                </div>
              )}
              {mostrarMensajeFallido && (
                <div className="mt-4 rounded bg-red-500 p-2 font-bold text-white">
                  ¡La edición del usuario a fallado!
                </div>
              )}
            </form>

            <div className="mt-4 flex justify-between">
              {!mostrarConfirmacion ? (
                <button
                  onClick={() => setMostrarConfirmacion(true)}
                  className="mt-[10px] bg-accent self-center text-background hover:bg-background hover:text-primary px-4 py-2 rounded-[10px] font-bold mx-auto"
                >
                  Eliminar cuenta
                </button>
              ) : (
                <div className="mt-4 flex">
                  <p>¿Estás seguro que deseas eliminar tu cuenta?</p>
                  <button
                    onClick={handleEliminarUsuario}
                    className="mt-2 rounded bg-red-500 px-4 py-2 font-medium text-white hover:bg-red-600"
                  >
                    Confirmar eliminación
                  </button>
                  <button
                    onClick={() => setMostrarConfirmacion(false)}
                    className="mt-2 rounded bg-gray-300 px-4 py-2 font-medium text-gray-800 hover:bg-gray-400"
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
};
EditarUsuarioPage.getLayout = function getLayout(page, screenWidth) {
  return <Home screenWidth={screenWidth}>{page}</Home>;
};

export default EditarUsuarioPage;
