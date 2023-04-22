// obteniendo los amigos del usuario actual con graphql
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AiOutlineComment } from "react-icons/ai";

export default function FriendList() {
  const [friends, setFriends] = useState([]);

  // dummy data de amigos
  // TODO: cambiar por datos de la base de datos
  const dummyFriends = [
    {
      nombre: "Juan Carlos",
      apellido: "Bodoque",
      foto: "/bodoque.jpeg",
      status: "online",
    },
    {
      nombre: "Tulio",
      apellido: "Triviño",
      foto: "/tulio.png",
      status: "online",
    },
    {
      nombre: "Juanin Juan",
      apellido: "Harry",
      foto: "/juanin.png",
      status: "offline",
    },
    {
      nombre: "Juan Carlos",
      apellido: "Bodoque",
      foto: "/bodoque.jpeg",
      status: "online",
    },
    {
      nombre: "Tulio",
      apellido: "Triviño",
      foto: "/tulio.png",
      status: "online",
    },
  ];

  // estilos para el estado de conexion 
  // q: como se usa esto?
  // a: se usa en el className de la etiqueta <div> que contiene el estado de conexion
  // a: ejemplo: <AiOutlineComment className={`text-2xl ${statusStyle.online}`}  />
  // a: cualquier modificacion que se quiera hacer al estilo del icono se hace en el objeto statusStyle
  const statusStyle = {
    online: "dark:text-textDarkColor text-green-500",
    offline: "dark:primaryDarkColor text-red-500",
  };

  const statusChecker = (status) => {
    if (status === "online") {
      return (
        <AiOutlineComment className={`text-2xl ${statusStyle.online}`}  />
      )
    } else {
      return (
        <AiOutlineComment className={`text-2xl ${statusStyle.offline}`}  />
      )
    }
  }

  // consulta a la base de datos
  useEffect(() => {
    setFriends(dummyFriends);
  }, []);

  // funcion para renderizar los amigos
  const renderFriends = () => {
    return friends.map((friend) => {
      return (
        <li className="p-2 border-b border-gray-200  dark:border-gray-700  flex snap-center cursor-pointer flex-row items-center justify- gap-2 hover:opacity-80 active:opacity-60">
          <div className="flex ">
            <Image
              src={friend.foto}
              alt="Foto Perfil"
              className="rounded"
              height={50}
              width={50}
            />
          </div>
          <div className="flex flex-row items-center gap-2">
            <h1 className="flex grow">{friend.nombre} {friend.apellido}</h1>
          </div>
          {/* opcion de chat */}
          <button className="flex  ml-auto justify-end">
            {statusChecker(friend.status)}
          </button>
        </li>
      );
    });
  };

  return (
    <>
      {/* container */}
      <div className="mb-2">
        <h1 className="mb-2 text-2xl font-semibold text-textDarkColor">
          Amigos
        </h1>
        <ul className="flex snap-y  flex-col max-h-64 overflow-y-scroll scroll-smooth   gap-2 rounded-md bg-white dark:bg-[#231842] dark:text-[#a9dacb]">
          {renderFriends()}
        </ul>
      </div>
    </>
  );
}
