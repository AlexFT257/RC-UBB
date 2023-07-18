import React from "react";
import GroupHeader from "../../components/groupHeader";
import Head from "next/head";
import Header from "../../components/header";
import ProfileDisplay from "../../components/profileDisplay";
import RecentGroups from "../../components/recentGroups";
import FriendList from "../../components/friendList";
import EventList from "@/components/eventList";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import { getItem } from "@/utils/localStorage";
import jwt from "jsonwebtoken";
import { AiOutlineUser, AiOutlineUserDelete } from "react-icons/ai";

export default function Members() {
  // obtener el id del grupo desde la url
  const router = useRouter();
  const { groupId } = router.query;
  console.log("groupId", groupId);

  // fetch de la info del grupo
  const GET_GROUP_INFO = gql`
    query buscarGrupoId($id: ID!) {
      buscarGrupoId(id: $id) {
        id
        nombre
        icono
        banner
        admins {
          id
          nombre
          apellido
          username
          foto_perfil
        }
        miembros {
          id
          nombre
          apellido
          username
          foto_perfil
        }
        solicitudes {
          id
          nombre
          apellido
          username
          foto_perfil
        }
      }
    }
  `;

  const {
    loading: loadingGroupInfo,
    error: errorGroupInfo,
    data: dataGroupInfo,
  } = useQuery(GET_GROUP_INFO, {
    variables: { id: groupId },
  });

  // determinar si el usuario es administrador del grupo
  const token = getItem("token");
  const decoded = jwt.decode(token);

  const isAdmin = () => {
    if (
      dataGroupInfo?.buscarGrupoId?.admins?.some(
        (admin) => admin.id === decoded.id
      )
    ) {
      return true;
    } else {
      return false;
    }
  };

  function MemberList() {
    if (loadingGroupInfo) return <p>Cargando...</p>;
    if (errorGroupInfo) return <p>Error</p>;

    const userFoto = (foto_perfil) => {
      if (foto_perfil) {
        return <img src={foto_perfil} className="h-6 w-6 rounded-full" />;
      } else {
        return <AiOutlineUser className="h-6 w-6" />;
      }
    };

    return (
      <div className="bg-slate flex flex-col p-2">
        <h1 className="text-2xl font-semibold">Miembros</h1>
        <div className="flex flex-col">
          {dataGroupInfo?.buscarGrupoId?.miembros?.map((miembro) => (
            <div className="flex flex-row items-center justify-between ">
              <div className="m-2 flex flex-row font-semibold">
                {userFoto(miembro.foto_perfil)}
                <p className="ml-2">
                  {miembro.nombre} {miembro.apellido}
                </p>
                <p className="ml-2">@ {miembro.username}</p>
              </div>
              {isAdmin() && (
                <div className="flex flex-row gap-2">
                  <button className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700">
                    <AiOutlineUserDelete className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  function AdminList() {
    if (loadingGroupInfo) return <p>Cargando...</p>;
    if (errorGroupInfo) return <p>Error</p>;

    const userFoto = (foto_perfil) => {
      if (foto_perfil) {
        return <img src={foto_perfil} className="h-6 w-6 rounded-full" />;
      } else {
        return <AiOutlineUser className="h-6 w-6" />;
      }
    };

    return (
      <div className="bg-slate flex flex-col p-2">
        <h1 className="text-2xl font-semibold">Administradores</h1>
        <div className="flex flex-col">
          {dataGroupInfo?.buscarGrupoId?.admins?.map((admin) => (
            <div className="flex flex-row items-center justify-between">
              <div className="m-2 flex flex-row font-semibold">
                {userFoto(admin.foto_perfil)}
                <p className="ml-2">
                  {admin.nombre} {admin.apellido}
                </p>
                <p className="ml-2">@ {admin.username}</p>
              </div>
              {isAdmin() && (
                <div className="flex flex-row gap-2">
                  <button className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700">
                    <AiOutlineUserDelete className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  function SolicitudesList(){
    if(loadingGroupInfo) return <p>Cargando...</p>;
    if(errorGroupInfo) return <p>Error</p>;

    const userFoto = (foto_perfil) => {
      if (foto_perfil) {
        return <img src={foto_perfil} className="h-6 w-6 rounded-full" />;
      } else {
        return <AiOutlineUser className="h-6 w-6" />;
      }
    }

    if(dataGroupInfo?.buscarGrupoId?.solicitudes?.length === 0){
      return(
        <div className="bg-slate flex flex-col p-2">
          <h1 className="text-2xl font-semibold">Solicitudes</h1>
          <div className="flex flex-col m-2">
            <p>No hay solicitudes</p>
          </div>
        </div>
      )
    }


    return(
      <div className="bg-slate flex flex-col p-2">
        <h1 className="text-2xl font-semibold">Solicitudes</h1>
        <div className="flex flex-col">
          {dataGroupInfo?.buscarGrupoId?.solicitudes?.map((solicitud) => (
            <div className="flex flex-row items-center justify-between">
              <div className="m-2 flex flex-row font-semibold">
                {userFoto(solicitud.foto_perfil)}
                <p className="ml-2">
                  {solicitud.nombre} {solicitud.apellido}
                </p>
                <p className="ml-2">@ {solicitud.username}</p>
              </div>
              {isAdmin() && (
                <div className="flex flex-row gap-2">
                  <button className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700">
                    <AiOutlineUserDelete className="h-4 w-4" />
                  </button>
                  <button className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700">
                    <AiOutlineUserDelete className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  console.log("isAdmin?", isAdmin());

  return (
    <>
      <div className="bg-[#e2e2e2] dark:bg-bgDarkColor ">
        <Head>
          <title>RC UBB</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="min-h-screen dark:bg-[url(/BackgroundStars.jpg)] dark:bg-cover dark:bg-fixed">
          {/* Header */}
          <Header />

          {/* content */}
          <div className=" grid  w-screen grid-flow-col grid-cols-5">
            {/* Perfil y grupos recientes(?) */}
            <div className="col-span-1  m-2 hidden h-fit flex-col rounded-md p-2   text-black shadow-xl  dark:text-[#a9dacb] lg:flex">
              {/* perfil */}
              <ProfileDisplay />

              {/* grupos recientes */}
              <RecentGroups />
            </div>

            {/* Publicaciones / feed */}
            <div className="bg-slate- col-span-5  p-2 lg:col-span-3">
              {/* publiacaiones cards */}
              {/* Group header */}
              <GroupHeader
                GroupName={dataGroupInfo?.buscarGrupoId?.nombre}
                GroupId={groupId}
                isAdmin={isAdmin()}
              />

              {/* listas container */}
              <div className="grid grid-cols-3 rounded-md bg-accentDarkColor">
                {/* lista miembros */}
                <div className="col-span-1 m-2 hidden h-fit flex-col rounded-md bg-bgDarkColorTrasparent p-2  text-black   dark:text-[#a9dacb] lg:flex">
                  {MemberList()}
                </div>
                {/* lista administradores */}
                <div className="col-span-1 m-2 hidden h-fit flex-col rounded-md bg-bgDarkColorTrasparent p-2  text-black   dark:text-[#a9dacb] lg:flex">
                  {AdminList()}
                </div>
                {/* lista solicitudes */}
                <div className="col-span-1 m-2 hidden h-fit flex-col rounded-md bg-bgDarkColorTrasparent p-2  text-black   dark:text-[#a9dacb] lg:flex">
                  {SolicitudesList()}
                </div>
              </div>
            </div>
            <div className="col-span-1  m-2 hidden h-fit flex-col rounded-md p-2  text-black shadow-xl  dark:text-[#a9dacb] lg:flex">
              {/* calendario */}
              <EventList />
              {/* Lista de amigos */}
              <FriendList />
            </div>
          </div>

          {/* chat */}
          <div className=" fixed bottom-1 right-4  h-10 w-48 rounded-md bg-white dark:bg-[#231842] dark:text-[#a9dacb] ">
            <div className="bg-slate flex flex-col p-2">
              <h1 className="font-semibold">Chat</h1>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
