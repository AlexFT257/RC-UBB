import { useState } from "react";
import axios from "axios";

export default function prueba() {
  const [nombre, setNombre] = useState("");
  const [acronimo, setAcronimo] = useState("");

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleAcronimoChange = (e) => {
    setAcronimo(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("http://localhost:4000/graphql", {
        query: `
          mutation {
            crearCarrera(
              nombre: "${nombre}",
              acronimo: "${acronimo}"
            ) {
              nombre
              acronimo
            }
          }
        `,
      });

      console.log(data.data.crearCarrera);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>MI PAGINA PERRONA </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" value={nombre} onChange={handleNombreChange} />
        </div>
        <div>
          <label htmlFor="acronimo">Acrónimo:</label>
          <input type="text" id="acronimo" value={acronimo} onChange={handleAcronimoChange} />
        </div>
        <button type="submit">Crear carrera</button>
      </form>
    </div>
  );
}