import { useState } from "react";
import Head from 'next/head';
import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";



export default function crearUsuario(screenWidth) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [username, setNombreUsuario] = useState("");
  const [correo, setEmail] = useState("");
  const [contrasena, setPassword] = useState("");
  const [fecha_nacimiento, setFechaNacimiento] = useState("");
  const [carrera, setCarrera] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [nombreError, setNombreError] = useState("");
  const [apellidoError, setApellidoError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [correoError, setCorreoError] = useState("");
  const [contrasenaError, setContrasenaError] = useState("");
  const { resolvedTheme, setTheme } = useTheme();

  const router = useRouter();
  const CREATE_USER = gql`
    mutation{crearUsuario(nombre: "${nombre}",apellido: "${apellido}",username:"${username}",correo: "${correo}", contrasena:"${contrasena}", fecha_nacimiento: "${fecha_nacimiento}", carrera: "${carrera}"){
    id
    nombre
    apellido
    username
    correo
    contrasena
    fecha_nacimiento
  
      }
    }`;
  const GET_CARRERAS = gql`
query {
  all_carreras {
    id
    nombre
  }
}
`;

  const [crearUsuario, { error, reset }] = useMutation(CREATE_USER);
  const { data: carrerasData, loading: carrerasLoading } = useQuery(GET_CARRERAS);
  const validateForm = () => {
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNombreError("");
    setApellidoError("");
    setUsernameError("");
    setCorreoError("");
    setContrasenaError("")
    // Validar el formulario antes de enviarlo
    if (!validateForm()) {
      return;
    }

    try {
      const { data } = await crearUsuario({
        variables: {
          nombre,
          apellido,
          username,
          correo,
          contrasena,
          fecha_nacimiento,
        },
      });

      if (data.crearUsuario) {
        router.push("/login");
      }

    } catch (error) {
      if (error.message.includes("Ya existe un usuario con este correo")) {
        setCorreoError("El correo ya está registrado");
      } else if (error.message.includes("El nombre de usuario ya está ocupado")) {
        setUsernameError("El nombre de usuario ya está ocupado");
      } else {
        console.log("Error al crear el usuario:", error.message);
      }
    }
  };

  if (carrerasLoading) {
    return <p>Cargando carreras...</p>;
  }

  const carreras = carrerasData ? carrerasData.all_carreras : [];
  return (
    <>
      <div
        className={`z-1 fixed bottom-0 left-0 right-0 top-0 ${resolvedTheme === "light" ? "" : " opacity-70 "
          } 
            bg-background bg-cover bg-fixed`}
      ></div>
      <div className="flex justify-center items-center min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="absolute top-4 left-4 mb-4">
            <img
              src="/LogoUchat.png"
              alt="Logo UChat"
              className="h-12 w-32 mr-4"
            />
            <div className="text-center">Red social creada para la Universidad del Bio-Bio</div>
          </div>
          <div className="flex justify-center ">
            <div className="z-10  flex-col items-center justify-center rounded-[10px] bg-foreground p-4 text-primary shadow-2xl">
              <h1 className="text-2xl font-bold mb-4 bg-foreground ">Crear Usuario</h1>
              <form onSubmit={handleSubmit} className="space-y-4 bg-foreground ">
                <div>
                  <input
                    type="text"
                    className="my-2 w-5/6 max-w-[400px] rounded-[10px] bg-background p-2  placeholder-secondary outline-none focus:outline-secondary"
                    id="nombre"
                    placeholder="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />

                  {nombreError && <div className="text-red-500">{nombreError}</div>}
                </div>
                <div>
                  <input
                    type="text"
                    className="my-2 w-5/6 max-w-[400px] rounded-[10px] bg-background p-2  placeholder-secondary outline-none focus:outline-secondary"
                    id="apellido"
                    placeholder="apellido"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                  />

                  {apellidoError && <div className="text-red-500">{apellidoError}</div>}
                </div>
                <div>
                  <input
                    type="text"
                    className="my-2 w-5/6 max-w-[400px] rounded-[10px] bg-background p-2  placeholder-secondary outline-none focus:outline-secondary"
                    id="username"
                    placeholder="nombre de usuario"
                    value={username}
                    onChange={(e) => setNombreUsuario(e.target.value)}
                  />


                  {usernameError && <div className="text-red-500">{usernameError}</div>}
                </div>
                <div>

                  <input
                    type="correo"
                    className="my-2 w-5/6 max-w-[400px] rounded-[10px] bg-background p-2  placeholder-secondary outline-none focus:outline-secondary"
                    placeholder="correo"
                    value={correo}
                    onChange={(e) => setEmail(e.target.value)} required
                  />
                  {correoError && <div className="text-red-500">{correoError}</div>}
                </div>
                <div>
                  <input
                    type="password"
                    className="my-2 w-5/6 max-w-[400px] rounded-[10px] bg-background p-2  placeholder-secondary outline-none focus:outline-secondary"
                    id="contrasena"
                    placeholder="contrasena"
                    value={contrasena}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  {contrasenaError && <div className="text-red-500">{contrasenaError}</div>}
                </div>
                <div>
                  <input
                    type="date"
                    className="my-2 w-5/6 max-w-[400px] rounded-[10px] bg-background p-2  placeholder-secondary outline-none focus:outline-secondary"
                    id="fecha_nacimiento"
                    placeholder="fecha_nacimiento"
                    value={username}
                    onChange={(e) => setFechaNacimiento(e.target.value)}
                  />

                </div>
                <div>

                  <select
                    id="carrera"
                    value={carrera}
                    onChange={(e) => setCarrera(e.target.value)}
                    required
                    className="my-2 w-5/6 max-w-[400px] rounded-[10px] bg-background p-2  placeholder-secondary outline-none focus:outline-secondary"
                  >
                    <option value="">Selecciona una carrera</option>
                    {carreras.map(carrera => (
                      <option key={carrera.id} value={carrera.id}>
                        {carrera.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <button
                    type="submit"
                    className="   w-5/6  max-w-[400px]  rounded-[10px] bg-accent p-3  font-semibold hover:bg-primary hover:text-background active:bg-background active:text-primary"
                  >
                    Crear usuario
                  </button>
                </div>
              </form>
              <p>
                ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
              </p>
            </div>
          </div>
        </div>
      </div></>
  );
}