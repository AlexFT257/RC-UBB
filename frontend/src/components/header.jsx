import Image from "next/image";
import Link from "next/link";
import {
  AiOutlineSearch,
  AiOutlineHome,
  AiOutlineCalendar,
  AiOutlineGroup,
  AiOutlineIdcard,
  AiOutlineUserAdd,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import { HiOutlineUserGroup } from "react-icons/hi";
import { useEffect, useState, useRef } from "react";
import { useComponentVisible } from "@/hooks/useComponentVisible";
import { useSearchUsers, useSearchGroups, useSendJoinRequest } from '../utils/searchUtils';
import jwtDecode from "jwt-decode";

export default function Header() {
  const [search, setSearch] = useState("");
  const [searchGroup, setSearchGroup] = useState("");
  const [showResults, setShowResults] = useState(false);

  // esta funcion cambia el valor del search cada vez que se escribe en el input
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    setSearchGroup(e.target.value);
  };

  const { loading: loadingUser, error: errorUser, searchResults: userSearchResults, refetch: refetchUser } = useSearchUsers(search);
  const { loading: loadingGroup, error: errorGroup, searchResults: groupSearchResults, refetch: refetchGroup } = useSearchGroups(searchGroup);
  const { loading: loadingJoin, error: errorJoin, sendJoinRequest } = useSendJoinRequest();

  // funcion para actualizar las queries (refetch) cada vez que se hace una busqueda
  const refecthQueries = () => {
    refetchUser();
    refetchGroup();
  };

  // la funcion handleSubmit se ejecuta cuando se da click en el boton de buscar
  // o se presiona enter en el input
  const handleSubmit = (e) => {
    e.preventDefault();
    // refetch para volver a hacer la consulta
    refecthQueries();
    // activa el dropdown
    if (search !== "") {
      setShowResults(true);
    }
  };

  // este useEffect se ejecuta cada vez que se cambia el valor del input
  // y si el valor es vacio cierra el dropdown para no generar otra consulta
  useEffect(() => {
    if (search === "") {
      setShowResults(false);
    }
  }, [search]);

 
  // la funcion Groups recibe los datos de la consulta y los muestra en pantalla
  function Groups({ groupSearchResults, errorGroup, loadingGroup }) {
    if (loadingGroup) return <p>Loading...</p>;
    if (errorGroup) return <p>Error :</p>;
    // console.log("Grupos", groupSearchResults);

    // sacar el id del usuario logueado del local storage
    const decodedToken = jwtDecode(localStorage.getItem("token"));
    const loggedUserId = decodedToken.id;
    // console.log("ID del usuario logueado", loggedUserId);

    if (groupSearchResults.length === 0) {
      return (
        <div className="m-2 flex flex-grow justify-between rounded-md bg-bgDarkColorTrasparent p-2">
          <div className="flex flex-col">
            <h1>No se encontraron grupos</h1>
          </div>
        </div>
      );
    }

    return groupSearchResults.map(({ id, nombre, descripcion, miembros }) => {
      // funcion que envia la solicitud de unirse al grupo
      const handleResquestGroup = () => {
        // e.preventDefault();
        console.log("Solicitando unirse al grupo", id);
        console.log("ID del usuario logueado", loggedUserId);
        sendJoinRequest(id, loggedUserId);
        // refetch para que se actualice el icono
        refecthQueries();
      };

      console.log("Miembros", miembros);

      // determina si el usuario es miembro del grupo que busco
      // para renderizar un boton de unirse o no
      const checkUserIsMember = () => {
        // bool que determina si el usuario es miembro del grupo
        const isMember = miembros.some((miembro) => {
          return miembro.id === loggedUserId;
        });

        // si es miembro se retorna el boton de unirse deshabilitado
        if (isMember) {
          console.log("Es miembro");
          return (
            <>
              <button
                className="rounded bg-green-500 px-4 py-2 font-bold text-white"
                disabled
              >
                <HiOutlineUserGroup />
              </button>
            </>
          );
        }

        return (
          <>
            <button
              onClick={handleResquestGroup}
              className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
              <AiOutlineUsergroupAdd />
            </button>
          </>
        );
      };

      return (
        <div
          key={id}
          className="m-2 flex flex-grow justify-between rounded-md bg-bgDarkColorTrasparent p-2"
        >
          <div className="flex flex-col">
            {/* TODO: inserte aqui la foto (user no tiene foto) */}
            <h1>{nombre}</h1>
            <p className="hidden lg:flex">{descripcion}</p>
          </div>
          <div className="m-2 flex">{checkUserIsMember()}</div>
        </div>
      );
    });
  }

  // la funcion Users recibe los datos de la consulta y los muestra en pantalla
  function Users({ userSearchResults, errorUser, loadingUser }) {
    // checa si hay un error o si esta cargando
    if (loadingUser) return <p>Loading...</p>;
    if (errorUser) return <p>Error</p>;
    console.log("Usuarios", userSearchResults);

    // si no hay usuarios que mostrar, muestra un mensaje
    if (userSearchResults.length === 0) {
      return (
        <div className="m-2 flex flex-grow justify-between rounded-md bg-bgDarkColorTrasparent p-2">
          <div className="flex flex-col">
            <h1>No se encontraron usuarios</h1>
          </div>
        </div>
      );
    }

    return userSearchResults.map(({ id, nombre, apellido, correo }) => {
      // funcion que envia la solicitud de amistad
      const handleAddFriend = (e) => {
        e.preventDefault();
        console.log("Agregando amigo", id);
        // TODO: Agregar amigo

        // refetch para actualizar la lista de amigos
        // refecthQueries();
      };

      // determina si el usuario encontrado es el mismo que esta logueado
      // para no mostrarlo en la lista de usuarios
      // sacar el id del usuario logueado del local storage
      const decodedToken = jwtDecode(localStorage.getItem("token"));
      const loggedUserId = decodedToken.id;
      // si el id del usuario logueado es igual al id del usuario que se esta iterando
      // se retorna null para no mostrarlo en la lista
      if (loggedUserId === id) {
        return (
          <div className="m-2 flex flex-grow justify-between rounded-md bg-bgDarkColorTrasparent p-2">
            <div className="flex flex-col">
              <h1>No se encontraron usuarios</h1>
            </div>
          </div>
        );
      }


      return (
        <div
          key={id}
          className="m-2 flex flex-grow justify-between rounded-md bg-bgDarkColorTrasparent p-2"
        >
          <div className="flex flex-col">
            {/* TODO: inserte aqui la foto (user no tiene foto) */}
            <h1>
              {nombre} {apellido}
            </h1>
            <p className="hidden lg:flex">{correo}</p>
          </div>
          <div className="m-2 flex">
            <button
              onClick={handleAddFriend}
              className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
              <AiOutlineUserAdd />
            </button>
          </div>
        </div>
      );
    });
  }

  // la funcion DropDown es el componente que se muestra en pantalla
  // y que contiene los resultados de la busqueda y usa el hook useComponentVisible
  const DropDown = () => {
    const { ref, isComponentVisible, setIsComponentVisible } =
      useComponentVisible(showResults);

    return (
      <div ref={ref}>
        {isComponentVisible && (
          // el posicionamiento del dropdown se hace con tailwind y absolute pa que
          // se vea abajo del input y no se mueva con el scroll
          <div className="absolute left-1/4 top-20 z-50   w-1/2 rounded-lg    bg-accentDarkColor  p-4 shadow-2xl shadow-bgDarkColor dark:text-[#a9dacb]  ">
            <h1 className="text-xl ">Personas</h1>
            <div className="flex flex-col gap-2">
              <Users userSearchResults={userSearchResults} errorUser={errorUser} loadingUser={loadingUser} />
            </div>
            <h1 className="text-xl ">Grupos</h1>
            <div className="flex flex-col gap-2">
              <Groups groupSearchResults={groupSearchResults} errorGroup={errorGroup} loadingGroup={loadingGroup} />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/*  gradient-to-t from-[#E2E2E2]  to-[#B2B2B2] */}
      <header className="mb-2   flex flex-row  items-center justify-evenly bg-white p-4   font-semibold text-black shadow-xl dark:bg-[#231842]  dark:text-[#a9dacb]">
        {/* left side */}
        <div className="mx-auto hidden flex-row items-center md:flex  md:w-1/3">
          <Image src="/LogoUchat.png" alt="Icono" width={100} height={50} />
        </div>
        <div className="bg- mx-auto  flex items-center  justify-center  md:w-1/3 ">
          <form
            action=""
            onSubmit={handleSubmit}
            className=" flex w-full justify-between rounded-lg dark:bg-bgDarkColor dark:text-[#a9dacb] "
          >
            <input
              className="focus:outline-slate-800 w-3/4 appearance-none rounded-lg  p-2 outline-none focus:outline-2 dark:bg-bgDarkColor dark:text-[#a9dacb] md:w-full "
              type="text"
              placeholder="Buscar"
              value={search}
              onChange={handleSearch}
            />
            <button className="flex " type="submit">
              <AiOutlineSearch className="m-2 flex text-2xl hover:cursor-pointer hover:opacity-80 active:opacity-70" />
            </button>
          </form>

          {/* contenedor de los resultados de la busqueda */}
          <DropDown />
        </div>

        {/* right side */}
        <div className="mx-auto flex flex-row justify-end gap-2 md:w-1/3">
          <Link
            href="/"
            className=" flex flex-row items-center  hover:cursor-pointer hover:opacity-80 active:opacity-70"
          >
            <AiOutlineHome className="m-2 text-2xl " />
            <h1 className=" hidden xl:flex">Inicio</h1>
          </Link>

          <Link
            href="/calendar"
            className=" flex flex-row items-center rounded-md hover:cursor-pointer hover:opacity-80 active:opacity-70"
          >
            <AiOutlineCalendar className="m-2 text-2xl " />
            <h1 className=" hidden xl:flex">Calendario</h1>
          </Link>

          <Link
            href="/groupPage"
            className=" flex flex-row items-center rounded-md hover:cursor-pointer hover:opacity-80 active:opacity-70"
          >
            <AiOutlineGroup className="m-2 text-2xl " />
            <h1 className=" hidden xl:flex">Grupos</h1>
          </Link>
          <Link
            href="/profile"
            className=" flex flex-row items-center rounded-md hover:cursor-pointer hover:opacity-80 active:opacity-70"
          >
            <AiOutlineIdcard className="m-2 text-2xl " />
            <h1 className=" hidden xl:flex">Perfil</h1>
          </Link>
        </div>
      </header>
    </>
  );
}
