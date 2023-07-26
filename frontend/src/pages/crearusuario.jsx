import { useState } from "react";
import Head from "next/head";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

export default function crearUsuario() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [nombre_usuario, setNombreUsuario] = useState("");
  const [correo, setEmail] = useState("");
  const [contrasena, setPassword] = useState("");
  const [fecha_nacimiento, setFechaNacimiento] = useState("");
  const [carrera, setCarrera] = useState([]);
  const [estado, setEstado] = useState("");
  const [rol, setRol] = useState("");
  const router = useRouter();
  const CREATE_USER = gql`
    mutation{crearUsuario(nombre: "${nombre}",apellido: "${apellido}",nombre_usuario:"${nombre_usuario}",correo: "${correo}", contrasena:"${contrasena}", fecha_nacimiento: "${fecha_nacimiento}", carrera: "${carrera}", estado: "${estado}", rol: "${rol}"){
    id
    nombre
    apellido
    nombre_usuario
    correo
    contrasena
    fecha_nacimiento
    estado
    rol
  
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
  const { data: carrerasData, loading: carrerasLoading } =
    useQuery(GET_CARRERAS);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(crearUsuario, "hola");
    crearUsuario({
      variables: {
        nombre,
        apellido,
        nombre_usuario,
        correo,
        contrasena,
        fecha_nacimiento,
        estado,
        rol,
      },
    })
      .then((response) => {
        console.log(response.data, "holahola");
        router.push("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (carrerasLoading) {
    return <p>Cargando carreras...</p>;
  }

  const carreras = carrerasData ? carrerasData.all_carreras : [];
  return (
    <>
      <Head>
        <title>Crear Usuario</title>
      </Head>
      <h1>Crear Usuario</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="apellido">Apellido:</label>
          <input
            type="text"
            id="apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="nombre_usuario">Nombre de Usuario:</label>
          <input
            type="text"
            id="nombre_usuario"
            value={nombre_usuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="correo">Correo:</label>
          <input
            type="email"
            id="correo"
            value={correo}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="contrasena">Contraseña:</label>
          <input
            type="password"
            id="contrasena"
            value={contrasena}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="fecha_nacimiento">Fecha de Nacimiento:</label>
          <input
            type="date"
            id="fecha_nacimiento"
            value={fecha_nacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="carrera">Carrera:</label>
          <select
            id="carrera"
            value={carrera}
            onChange={(e) => setCarrera(e.target.value)}
            required
          >
            <option value="">Selecciona una carrera</option>
            {carreras.map((carrera) => (
              <option key={carrera.id} value={carrera.id}>
                {carrera.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="estado">Estado:</label>
          <select
            id="estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            required
          >
            <option value="">Selecciona un estado</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>
        <div>
          <label htmlFor="rol">Rol:</label>
          <input
            type="text"
            id="rol"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            required
          />
        </div>
        <button type="submit">Crear usuario</button>
      </form>
      <p>
        ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
      </p>
    </>
  );
}
