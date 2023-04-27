import Profile from "@/pages/profile";
import Image from "next/image";
import Link from "next/link";
import {
  AiOutlineSearch,
  AiOutlineHome,
  AiOutlineCalendar,
  AiOutlineGroup,
  AiOutlineIdcard,
  AiOutlineUserAdd,
} from "react-icons/ai";
// import { SEARCH_USERS } from "@/graphql/queries";
import { useEffect, useState, useRef } from "react";
// import axios from "axios";
import { gql, useQuery } from "@apollo/client";
import { KeyObject } from "crypto";

export default function Header() {
  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);

  // esta funcion cambia el valor del search cada vez que se escribe en el input
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  // Las dos siguientes constantes son las consultas a la API de los datos
  const GET_USER_BY_NAME = gql`
  query {
    buscarUsuario(buscar: "${search}") {
      id
      nombre
      apellido
      correo
    }
  }
`;

  const GET_GROUP_BY_NAME = gql`
  query {
    buscarGrupo(buscar: "${search}") {
      id
      nombre
      privacidad
      descripcion
    }
  }
`;

  // el useQuery hace las consultas a la API cada vez que se renderiza el componente
  // y como es un hook no puede estar dentro de una funcion
  // por eso se declaran los loading error y data aqui y se pasan como props a la funcion
  const { loading, error, data } = useQuery(GET_USER_BY_NAME);
  const { loading2, error2, groups } = useQuery(GET_GROUP_BY_NAME);

  // la funcion Users recibe los datos de la consulta y los muestra en pantalla
  function Users({ data, error, loading }) {
    // checa si hay un error o si esta cargando
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;
    console.log("Usuarios", data);

    return data?.buscarUsuario?.map(({ id, nombre, apellido, correo }) => {

      // funcion que envia la solicitud de amistad
      const handleAddFriend = (e) => {
        e.preventDefault();
        console.log("Agregando amigo", id);
        // TODO: Agregar amigo
      };

      return (
        <div
          key={id}
          className="flex flex-grow justify-between rounded-md bg-bgDarkColorTrasparent p-2"
        >
          <div className="flex flex-col">
            {/* TODO: inserte aqui la foto (user no tiene foto) */}
            <h1>
              {nombre} {apellido}
            </h1>
            <p className="hidden md:flex">{correo}</p>
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

  // la funcion Groups recibe los datos de la consulta y los muestra en pantalla
  function Groups({ groups, error2, loading2 }) {
    if (loading2) return <p>Loading...</p>;
    if (error2) return <p>Error :</p>;
    console.log("Grupos", groups?.data);
    return groups?.buscarGrupo.map(
      ({ id, nombre, privacidad, descripcion }) => (
        <div key={id}>
          <p>
            {nombre} {privacidad} {descripcion}
          </p>
        </div>
      )
    );
  }

  console.log(search);

  // la funcion handleSubmit se ejecuta cuando se da click en el boton de buscar
  // o se presiona enter en el input
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(search);
    console.log(data);
    // activa el dropdown
    if (search !== "") {
      setShowResults(true);
    }
  };

  // la funcion useComponentVisible es un hook que permite detectar cuando se da click
  // fuera del dropdown para cerrarlo automaticamente
  function useComponentVisible(showResults) {
    // se usa el hook useState para cambiar el estado de isComponentVisible
    // y asi poder mostrar u ocultar el dropdown
    const [isComponentVisible, setIsComponentVisible] = useState(showResults);
    const ref = useRef(null);

    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsComponentVisible(false);
      }
    };

    // aqui se agrega el evento de escuchar cuando se da click fuera del dropdown
    // y cuando se presiona escape para cerrarlo
    useEffect(() => {
      document.addEventListener("click", handleClickOutside, true);
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" || e.key === "Esc") {
          setIsComponentVisible(false);
        }
      });

      return () => {
        document.removeEventListener("click", handleClickOutside, true);
      };
    });

    return { ref, isComponentVisible, setIsComponentVisible };
  }

  // este useEffect se ejecuta cada vez que se cambia el valor del input
  // y si el valor es vacio cierra el dropdown para no generar otra consulta
  useEffect(() => {
    if (search === "") {
      setShowResults(false);
    }
  }, [search]);

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
          <div className="absolute left-1/4 top-20 z-50   w-1/2 rounded-lg p-4  shadow-lg dark:text-[#a9dacb] dark:backdrop-blur-3xl">
            <div className="flex flex-col gap-2">
              <Users data={data} error={error} loading={loading} />
            </div>
            <div>
              <Groups
                groups={groups?.data}
                error2={error2}
                loading2={loading2}
              />
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
