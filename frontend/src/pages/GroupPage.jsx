import React from "react";
import { useEffect, useState } from "react";
import { UserContext } from "@/utils/userContext";
import { gql, useQuery } from "@apollo/client";
import Home from "@/components/Home";
import { useContext } from "react";
import { VscLoading, VscError } from "react-icons/vsc";
import { HiOutlineUserGroup } from "react-icons/hi";
import { CgEnter } from "react-icons/cg";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import Link from "next/link";

const GET_USER_GROUPS = gql`
  query buscarGrupoUsuario($usuario: ID!) {
    buscarGrupoUsuario(usuario: $usuario) {
      id
      nombre
      descripcion
      icono
      banner
    }
  }
`;

function GroupPage() {
  const { user } = useContext(UserContext);
  const { loading, error, data } = useQuery(GET_USER_GROUPS, {
    variables: { usuario: user.id },
  });

  useEffect(() => {
    if (error) {
      console.log("error", error);
    }
  }, [error]);

  useEffect(() => {
    console.log("tiempo cargando", Date.now().toString() );
    console.log("loading", loading);
    if(!loading){
      console.log("tiempo cargando", Date.now().toString() );
    }
  }, [loading]);

  if (loading) {
    return (
      <>
        <div className="z-10 mt-[80px]   w-[100vw] max-w-[100vw] text-current lg:w-[55vw] lg:max-w-[90vw] lg:px-10">
        <div className="mt-4 flex-col items-center justify-between  m-4 rounded-lg  bg-foreground text-[5vw] font-bold sm:text-[18px] ">
          <div
            className="
            flex flex-row items-center  justify-between  rounded-md p-2 "
          >
            <h1 className="text-xl font-bold text-secondary ">Grupos</h1>
            <button className=" flex gap-2  hover:bg-background rounded-lg p-2">
              <p
              className=" font-semibold text-primary max-md:hidden text-lg  "
              >Crear Grupo</p>
              <AiOutlineUsergroupAdd className="text-3xl font-semibold text-primary" />
            </button>
          </div>
              <div className="flex  flex-col p-2 gap-2">
                <div className="bg-bgDarkColorTrasparent flex flex-row justify-center  rounded-md p-2 dark:text-[#a9dacb]">
                  <VscLoading className="animate-spin text-3xl" />
                </div>
              </div>
            </div>
          </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        {/* groups Cards*/}
        <div className="z-10 mt-[80px]   w-[100vw] max-w-[100vw] text-current lg:w-[55vw] lg:max-w-[90vw] lg:px-10">
        <div className="mt-4 flex-col items-center justify-between  m-4 rounded-lg  bg-foreground text-[5vw] font-bold sm:text-[18px] ">
          <div
            className="
            flex flex-row items-center  justify-between  rounded-md p-2 "
          >
            <h1 className="text-xl font-bold text-secondary ">Grupos</h1>
            <button className=" flex gap-2  hover:bg-background rounded-lg p-2">
              <p
              className=" font-semibold text-primary max-md:hidden text-lg  "
              >Crear Grupo</p>
              <AiOutlineUsergroupAdd className="text-3xl font-semibold text-primary" />
            </button>
          </div>
            <div className="grid grid-cols-1 gap-2 p-2">
              <div className="bg-bgDarkColorTrasparent flex flex-row justify-center gap-2  rounded-md p-2 dark:text-[#a9dacb]">
                <VscError className="animate-bounce text-3xl" />
                <p>Error: {error?.message}</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  function iconRender(icon) {
    if (icon.icono === null) {
      return <HiOutlineUserGroup className="text-3xl" />;
    }
    // return <GrGroup className="text-3xl" />;
    // console.log("icon", toString(icon.icono));
    return (
      <img
        src={icon.icono}
        width={40}
        height={40}
        className="max-h-10 rounded-full"
      />
    );
  }

  return (
    <>
      {/* Publicaciones / feed */}
      <div className="z-10 mt-[80px]   w-[100vw] max-w-[100vw] text-current lg:w-[55vw] lg:max-w-[90vw] lg:px-10">
        <div className="mt-4 flex-col items-center justify-between  m-4 rounded-lg  bg-foreground text-[5vw] font-bold sm:text-[18px] ">
          <div
            className="
            flex flex-row items-center  justify-between  rounded-md p-2 "
          >
            <h1 className="text-xl font-bold text-secondary ">Grupos</h1>
            <button className=" flex gap-2  hover:bg-background rounded-lg p-2">
              <p
              className=" font-semibold text-primary max-md:hidden text-lg  "
              >Crear Grupo</p>
              <AiOutlineUsergroupAdd className="text-3xl font-semibold text-primary" />
            </button>
          </div>
          {/* groups Cards*/}
          <div className="flex  flex-col p-2 gap-2">
            {data?.buscarGrupoUsuario.map((group) => (
              <div
                className="flex flex-row justify-between rounded-md bg-background  p-2 text-primary"
                key={group.id}
              >
                {/* icono del grupo */}
                <div className="flex ">
                  <div className="m-2 flex items-center justify-center">
                    {iconRender(group)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold">{group.nombre}</h2>
                    <p>{group.descripcion}</p>
                  </div>
                </div>
                {/* Agrega un botón o enlace para redirigir a la página del grupo */}
                <div className="m-2 flex items-center justify-center">
                  <Link
                    href={`/${group.id}/home`}
                    className="text-xl font-semibold"
                  >
                    <CgEnter
                      className="
                    text-3xl font-semibold text-primary"
                    />
                  </Link>
                </div>
              </div>
            ))}
            
          </div>
        </div>
      </div>
    </>
  );
}

GroupPage.getLayout = function getLayout(page, screenWidth) {
  return <Home screenWidth={screenWidth}>{page}</Home>;
};

export default GroupPage;
