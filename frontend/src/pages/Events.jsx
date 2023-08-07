import { useState, useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import styles from "@/styles/Home.module.css";
import { useMutation } from "@apollo/client";
import { clientMutator } from "@/utils/graphqlManager";
import {
    AiFillCloseCircle, AiFillDelete, GrFormAdd,
    AiFillPlusCircle
} from 'react-icons/ai';
import Home from "@/components/Home";
import { useContext } from "react";
import { UserContext } from "@/utils/userContext";








const Modal = ({ closeModal }) => {

    //TOKEN DEL USUARIO
    const { user } = useContext(UserContext);

    const [horarioData, setHorarioData] = useState([]);

    const requestHorario = async ({ dia, hora_inicio, hora_termino, asignatura, sala, acronimo, usuario }) => {
        const { crearHorario } = await clientMutator(
            `mutation CrearHorario($dia: String!, $hora_inicio: Date!, $hora_termino: Date!, $asignatura: String!, $sala: String!, $acronimo: String, $usuario: ID!) {
        
          crearHorario(dia:$dia, hora_inicio:$hora_inicio, hora_termino:$hora_termino, asignatura:$asignatura, sala:$sala, acronimo:$acronimo, usuario:$usuario) {
            id
          }
      }`,
            { dia: dia, hora_inicio: hora_inicio, hora_termino: hora_termino, asignatura: asignatura, sala: sala, acronimo: acronimo, usuario: user.id }).then((data) => { return data; })
            .catch((error) => { throw error; })

        return crearHorario;
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setHorarioData((prevData) => ({
            ...prevData,
            [name]: value,
        }));




    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { dia, hora_inicio, hora_termino, asignatura, sala, acronimo, usuario } = horarioData;

            if (!dia || !hora_inicio || !hora_termino || !asignatura || !sala || !acronimo) {
                window.alert("Por favor, complete todos los campos.");
                return;
            }

            if (
                dia.length < 3 ||
                hora_inicio.length < 3 ||
                hora_termino.length < 3 ||
                asignatura.length < 3 ||
                sala.length < 3 ||
                acronimo.length < 2
            ) {
                window.alert("Todos los campos deben tener al menos 3 caracteres. El acrónimo debe tener al menos 2 caracteres.");
                return;
            }

            if (hora_inicio > hora_termino) {
                window.alert("La hora de inicio debe ser menor a la hora de término.");
                return;
            }




            const horaInicioFormateada = new Date(`2023-07-22T${hora_inicio}`).toISOString();
            const horaTerminoFormateada = new Date(`2023-07-22T${hora_termino}`).toISOString();

            const { data } = await requestHorario({
                usuario: user?.id,
                dia: dia,
                hora_inicio: horaInicioFormateada,
                hora_termino: horaTerminoFormateada,
                asignatura: asignatura,
                acronimo: acronimo,
                sala: sala,
            });
            closeModal();
            window.location.reload();


        } catch (error) {
        }
    };
    const horasDisponibles = [
        "08:10", "09:40", "11:10", "12:40", "14:10", "15:40", "17:10", "18:40", "20:10", "21:40"
    ];

    const horasDisponiblesTermino = [
        "09:30", "11:00", "12:30", "14:00", "15:30", "17:00", "18:30", "20:00", "21:30", "23:00"
    ];


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-foreground p-8 rounded-lg max-w-lg w-full">
                <h2 className="text-2xl font-bold mb-4">Agregar Horario</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="dia" className="block text-gray-300 font-bold">
                            Día:
                        </label>
                        <select
                            id="dia"
                            name="dia"
                            value={horarioData.dia}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-blue-400"
                        >
                            <option value="">Selecciona un día</option>
                            <option value="Lunes">Lunes</option>
                            <option value="Martes">Martes</option>
                            <option value="Miercoles">Miércoles</option>
                            <option value="Jueves">Jueves</option>
                            <option value="Viernes">Viernes</option>
                            <option value="Sabado">Sábado</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="hora_inicio" className="block text-gray-300 font-bold">
                            Hora de Inicio:
                        </label>
                        <select
                            id="hora_inicio"
                            name="hora_inicio"
                            value={horarioData.hora_inicio}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-blue-400"
                        >
                            <option value="">Selecciona una hora de inicio</option>
                            {horasDisponibles.map((hora) => (
                                <option key={hora} value={hora}>{hora}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="hora_termino" className="block text-gray-300 font-bold">
                            Hora de Término:
                        </label>
                        <select
                            id="hora_termino"
                            name="hora_termino"
                            value={horarioData.hora_termino}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-blue-400"
                        >
                            <option value="">Selecciona una hora de término</option>
                            {horasDisponiblesTermino.map((hora) => (
                                <option key={hora} value={hora}>{hora}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="asignatura" className="block text-gray-300 font-bold">
                            Asignatura:
                        </label>
                        <input
                            pattern="^[A-Za-z ]+$"
                            maxLength="32"
                            placeholder="Ej: Gestión de Proyectos de Software"
                            type="text"
                            id="asignatura"
                            name="asignatura"
                            value={horarioData.asignatura}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="acronimo" className="block text-gray-300 font-bold">
                            Acronimo:
                        </label>
                        <input
                            pattern="^[A-Za-z ]+$"
                            maxLength="4"
                            type="text"
                            id="acronimo"
                            name="acronimo"
                            placeholder="Ej: GPS"
                            value={horarioData.acronimo}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="sala" className="block text-gray-300 font-bold">
                            Sala:
                        </label>
                        <input
                            pattern="^[A-Za-z ]+$"
                            maxLength="10"
                            type="text"
                            id="sala"
                            name="sala"
                            placeholder="Ej: 101AC"
                            value={horarioData.sala}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-blue-400"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="mr-4 px-4 py-2 bg-gray-300 text-gray-700 font-bold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            onClick={closeModal}
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSubmit}
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            Agregar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};






const VerHorario = () => {
    const { user } = useContext(UserContext);
    const [horario, setHorario] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);



    const BUSCAR_HORARIO_USUARIOID = gql`
    query BuscarHorarioUsuario($usuario: ID!) {
      buscarHorarioUsuario(usuario: $usuario) {
        id
        dia
        hora_inicio
        hora_termino
        asignatura
        sala
        acronimo
      }
    }
  `;


    const [buscarHorarioUsuario, { loading, data }] = useLazyQuery(
        BUSCAR_HORARIO_USUARIOID,
        {
            variables: { usuario: user?.id },
            onCompleted: (data) => setHorario(organizarHorario(data.buscarHorarioUsuario)),
        }
    );



    useEffect(() => {
        buscarHorarioUsuario();

    }, []);


    const organizarHorario = (clases) => {
        // Agrupar las clases por día mientras mantenemos el orden original
        const horarioPorDia = clases.reduce((acc, clase) => {
            const { dia } = clase;
            // Asegurarse de que los días sean válidos antes de agregar las clases
            if (acc[dia]) {
                acc[dia].push(clase);
            }
            return acc;
        }, {
            Lunes: [],
            Martes: [],
            Miercoles: [],
            Jueves: [],
            Viernes: [],
            Sabado: [],
        });

        return horarioPorDia;
    };


    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {


        setIsModalOpen(false);
    };



    const deleteHorario = async (id) => {
        const confirmDelete = window.confirm("¿Estás seguro que deseas eliminar este horario?");

        if (confirmDelete) {
            try {
                const { eliminarHorario } = await clientMutator(
                    `mutation EliminarHorario($id: ID!) {
            eliminarHorario(id: $id) {
              id
            }
          }`,
                    { id: id }
                );

                window.location.reload();
                return eliminarHorario;
            } catch (error) {
                throw error;
            }
        } else {
            // El usuario ha cancelado, no se realiza ninguna acción.
            return null;
        }
    };





    const minFilas = 4;
    const maxFilas = Math.max(...Object.values(horario).filter(dia => Array.isArray(dia)).map(dia => dia.length));
    const filasMostradas = Math.max(minFilas, maxFilas);


    /* ------------------------NOTAS--------------------------------*/


    /* ------------------------NOTAS--------------------------------*/




    return (
        <div>

            <div className="z-10 mt-[80px]   w-[100vw] max-w-[100vw] text-current lg:w-[55vw] lg:max-w-[90vw] lg:px-10">
                <div className="mt-4 flex-col items-center justify-between  m-4 rounded-lg  bg-foreground text-[5vw] font-bold sm:text-[18px] ">
                    <div className="">
                        <div className="page-container bg-foreground rounded-[20px]  w-12/12  ">
                            <div className="flex flex-col items-center justify-center p-4">
                                <div className="flex flex-col items-center justify-center p-1">
                                    <button className="flex gap-2  hover:bg-background rounded-lg p-2"
                                        onClick={openModal}>
                                        Agregar Horario
                                    </button>

                                </div>
                            </div>

                            <div className="p-6" >
                                {loading ? (
                                    <p>Cargando horario...</p>
                                ) : (
                                    <table className="w-full border-collapse table-auto">
                                        <thead>
                                            <tr>
                                                <th className="border p-2 w-[20px]"></th>
                                                <th className="border p-2 w-[150px]">Lunes</th>
                                                <th className="border p-2 w-[150px]">Martes</th>
                                                <th className="border p-2 w-[150px]">Miércoles</th>
                                                <th className="border p-2 w-[150px]">Jueves</th>
                                                <th className="border p-2 w-[150px]">Viernes</th>
                                                <th className="border p-2 w-[150px]">Sábado</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Array.from({ length: filasMostradas }).map((_, rowIndex) => (
                                                <tr key={rowIndex}>
                                                    <td className="border p-2 h-[120px]">{rowIndex + 1}</td>
                                                    {Object.entries(horario).map(([dia, clases]) => {
                                                        const clase = clases[rowIndex];
                                                        return (
                                                            <td className="border p-2 w-[150px]" key={dia}>
                                                                {clase ? (
                                                                    <div className="border p-2 rounded mb-2 bg-background">
                                                                        {`${clase.asignatura} (${clase.sala})`}
                                                                        <div>{`${new Date(clase.hora_inicio).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}</div>
                                                                        <div>{`- ${new Date(clase.hora_termino).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}</div>
                                                                        <AiFillCloseCircle onClick={() => deleteHorario(clase.id)} className="text-2xl" />
                                                                    </div>
                                                                ) : null}
                                                            </td>
                                                        );
                                                    })}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    </div>

                    {isModalOpen && <Modal closeModal={closeModal} />}
                </div>
            </div>





        </div>

    );
};

VerHorario.getLayout = function getLayout(page, screenWidth) {
    return <Home screenWidth={screenWidth}>{page}</Home>;
};

export default VerHorario;