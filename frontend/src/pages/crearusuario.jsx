import { useState } from "react";
import Head from 'next/head';
import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

export default function crearUsuario() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [username, setNombreUsuario] = useState("");
  const [correo, setEmail] = useState("");
  const [contrasena, setPassword] = useState("");
  const [fecha_nacimiento, setFechaNacimiento] = useState("");
  const [carrera, setCarrera] = useState([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(crearUsuario, "hola")
    crearUsuario({ variables: { nombre,
        apellido,
        username,
        correo,
        contrasena,
        fecha_nacimiento,
        } }).then(response => {
      console.log(response.data, "holahola")
      router.push("/login");

    }).catch(error => { console.log(error) })
  };

  if (carrerasLoading) {
    return <p>Cargando carreras...</p>;
  }

  const carreras = carrerasData ? carrerasData.all_carreras : [];
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Head>
          <title>Crear Usuario</title>
        </Head>
        <h1 className="text-2xl font-bold mb-4">Crear Usuario</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nombre" className="block font-medium">
              Nombre:
            </label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
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
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="username" className="block font-medium">
              Nombre de Usuario:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setNombreUsuario(e.target.value)}
              required
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
              value={correo}
              onChange={(e) => setEmail(e.target.value)}
              required
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
              value={contrasena}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="fecha_nacimiento" className="block font-medium">
              Fecha de Nacimiento:
            </label>
            <input
              type="date"
              id="fecha_nacimiento"
              value={fecha_nacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="carrera" className="block font-medium">
              Carrera:
            </label>
            <select
              id="carrera"
              value={carrera}
              onChange={(e) => setCarrera(e.target.value)}
              required
              className="border border-gray-300 rounded px-3 py-2 w-full"
            >
              <option value="">Selecciona una carrera</option>
              {carreras.map(carrera => (
                <option key={carrera.id} value={carrera.id}>
                  {carrera.nombre}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
          >
            Crear usuario
          </button>
        </form>
        <p>
          ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
        </p>
      </div>
    </div>
);

}