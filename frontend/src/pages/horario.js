import { useState } from 'react';
import axios from 'axios';

export default function CrearHorario ()  {
    // Estado local para guardar los valores de los inputs
    const [horario, setHorario] = useState({
        dia: '',
        hora_inicio: '',
        hora_termino: '',
        asignatura: '',
        acronimo: '',
        sala: '',
        usuario: '64431fc09583d7491a20ba9c', // Este valor es estático, pero podrías cambiarlo según tu lógica de autenticación
    });

    // Estado local para guardar el resultado de la petición
    const [resultado, setResultado] = useState(null);

    // Función para actualizar el estado local con los valores de los inputs
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setHorario((prevState) => ({ ...prevState, [name]: value }));
    };

    // Función para hacer la petición GraphQL utilizando axios
    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = 'http://localhost:4000/graphql'; // la URL de tu servidor GraphQL
        const query = `
      mutation {
        crearHorario(
          dia: "${horario.dia}",
          hora_inicio: "${horario.hora_inicio}",
          hora_termino: "${horario.hora_termino}",
          asignatura:"${horario.asignatura}",
          acronimo:"${horario.acronimo}",
          sala:"${horario.sala}",
          usuario: "${horario.usuario}"
        ) {
          id
          dia
          hora_inicio
          hora_termino
          asignatura
          acronimo
          sala
        }
      }
    `;

        try {
            const response = await axios.post(url, { query });
            setResultado(response.data.data.crearHorario);
        } catch (error) {
            console.error(error);
            setResultado(null);
        }
    };

    return (
        <div>
            <h1>Crear Horario</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Día:
                    <input
                        type="text"
                        name="dia"
                        value={horario.dia}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Hora de inicio:
                    <input
                        type="text"
                        name="hora_inicio"
                        value={horario.hora_inicio}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Hora de término:
                    <input
                        type="text"
                        name="hora_termino"
                        value={horario.hora_termino}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Asignatura:
                    <input
                        type="text"
                        name="asignatura"
                        value={horario.asignatura}
                        onChange={handleInputChange}/>
            </label>
                <br />
                <label>
                    Acrónimo:
                    <input
                        type="text"
                        name="acronimo"
                        value={horario.acronimo}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Sala:
                    <input
                        type="text"
                        name="sala"
                        value={horario.sala}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <button type="submit">Crear horario</button>
            </form>
            {resultado && (
                <div>
                    <h2>Resultado</h2>
                    <p>ID: {resultado.id}</p>
                    <p>Día: {resultado.dia}</p>
                    <p>Hora de inicio: {resultado.hora_inicio}</p>
                    <p>Hora de término: {resultado.hora_termino}</p>
                    <p>Asignatura: {resultado.asignatura}</p>
                    <p>Acrónimo: {resultado.acronimo}</p>
                    <p>Sala: {resultado.sala}</p>
                </div>
            )}
        </div>
    );
};


