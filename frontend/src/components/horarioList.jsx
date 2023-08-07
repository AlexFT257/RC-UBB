import React from "react";
import { useState, useEffect } from "react";
import {AiOutlineCalendar} from "react-icons/ai";
import { useContext } from "react";
import { UserContext } from "@/utils/userContext";
import { gql, useLazyQuery } from "@apollo/client";




export default function HorarioList(idUsuario) {


    const [horario, setHorario] = useState([]);


   // Define la consulta GraphQL
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


 // Ejecuta la consulta GraphQL cuando el componente se monta
 const [buscarHorarioUsuario, { loading, data }] = useLazyQuery(
   BUSCAR_HORARIO_USUARIOID,
   {
     variables: { usuario: idUsuario }, // Utiliza el idUsuario proporcionado
        onCompleted: (data) => {
            setHorario(data.buscarHorarioUsuario);
        }
   }
 );


 useEffect(() => {
   buscarHorarioUsuario();
 }, []);



 // Procesa los datos del horario y muestra la lista
const eventList = horario.map((event) => {
  return (
    <li key={event.id} className="flex flex-row border-b snap-start border-background border-dotted p-2 hover:bg-primary hover:text-background">
      {/* Detalles del horario */}
      <div className="flex relative mt-[5px]">
        <AiOutlineCalendar className="text-8xl text-secondary" />
        <h1 className="absolute text-secondary text-[18px] text-center w-[55px] left-[20px] bottom-6 font-bold">{event.dia}</h1>
      </div>

      <div className="m-2 flex-wrap overflow-hidden text-ellipsis flex-col h-[85px] max-w-[60%] grow">
        <h1 className="text-xl font-bold">{event.asignatura}</h1>
        <h1 className="text-sm line-clamp-3 text-justify w-[100%] max-w-[100%] ">{event.sala}</h1>
        <h1 className="text-sm line-clamp-3 text-justify w-[100%] max-w-[100%] ">{event.acronimo}</h1>
        <h1 className="text-sm line-clamp-3 text-justify w-[100%] max-w-[100%] ">{event.hora_inicio} - {event.hora_termino}</h1>
      </div>
    </li>
  );
});

 return (
   <>
     {/* Contenedor */}
     <div className="mb-2 w-[100%]">
       {/* Título */}
       <h2 className="flex font-bold justify-self-center mr-auto ml-[10px] mb-[10px] text-secondary opacity-80 "> HORARIOS </h2>
       {/* Lista de horarios */}
       <ul className="list-container flex flex-col snap-y max-h-64 overflow-hidden overflow-y-scroll rounded-md bg-foreground">
         {eventList}
       </ul>
     </div>
   </>
 );
}