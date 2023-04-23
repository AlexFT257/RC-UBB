import React from "react";
import { useState, useEffect } from "react";
import {AiOutlineCalendar} from "react-icons/ai";

export default function EventList() {
  const [events, setEvents] = useState([]);

  // dummy data de eventos
  const dummyEvents = [
    {
      id: 0,
      nombre: "Evento 1",
      descripcion: "Descripcion del evento 1",
      fechaInicio: "2021-10-10",
      fechaFin: "2021-10-10",
      horaInicio: "10:00",
      horaFin: "12:00",
      lugar: "Lugar 1",
    },
    {
      id: 1,
      nombre: "Evento 2",
      descripcion: "Descripcion del evento 2",
      fechaInicio: "2021-10-10",
      fechaFin: "2021-10-10",
      horaInicio: "10:00",
      horaFin: "12:00",
      lugar: "Lugar 2",
    },
    {
      id: 2,
      nombre: "Evento 3",
      descripcion: "Descripcion del evento 3",
      fechaInicio: "2021-10-10",
      fechaFin: "2021-10-10",
      horaInicio: "10:00",
      horaFin: "12:00",
      lugar: "Lugar 3",
    },
  ];

  // TODO: cambiar por datos de la base de datos
  useEffect(() => {
    setEvents(dummyEvents);
  }, []);

  // map de eventos
  const eventList = events.map((event) => {
    const fecha = event.fechaInicio.split("-");

    return (
      <li
        key={event.id}
        className="flex flex-row border-b  snap-start border-gray-200 xl:p-4  dark:border-gray-700"
      >
        {/* imagen del calendario con la fecha*/}
        <div className="flex  relative">
            <AiOutlineCalendar className="text-8xl dark:text-textDarkColor text-gray-400 "/>
            <h1 className="absolute left-6 bottom-6 font-bold">{fecha[1]}/{fecha[2]}</h1>
        </div>
        <div className="m-2 flex flex-col justify-between">
          <h1 className="text-xl font-semibold dark:text-textDarkColor">
            {event.nombre}
          </h1>
          <h1 className="text-lg  dark:text-textDarkColor">
            {event.descripcion}
          </h1>
        </div>
      </li>
    );
  });

  return (
    <>
      {/* contenedor */}
      <div className="mb-2">
        {/* titulo */}
        <div className="flex">
          <h1 className="mb-2 text-2xl font-semibold dark:text-textDarkColor">
            Eventos
          </h1>
        </div>
        {/* lista de eventos */}
        <ul className="flex flex-col snap-y max-h-64 overflow-hidden overflow-y-scroll rounded-md bg-white dark:bg-accentDarkColor dark:text-textDarkColor">
          {eventList}
        </ul>
      </div>
    </>
  );
}
