import React from "react";
import GroupHeader from "../../components/groupHeader";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import { getItem } from "@/utils/localStorage";
import jwt from "jsonwebtoken";
import { AiOutlineUser, AiOutlineUserDelete } from "react-icons/ai";
import Home from "@/components/home";
import { UserContext } from "@/utils/userContext";
import { useContext } from "react";

export default function Members() {
  const { user } = useContext(UserContext);
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

  const isAdmin = () => {
    if (
      dataGroupInfo?.buscarGrupoId?.admins?.some(
        (admin) => admin.id === user.id
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
    if (dataGroupInfo?.buscarGrupoId?.miembros?.length === 0) {
      return (
        <div className="bg-slate flex flex-col p-2">
          <h1 className="text-2xl font-semibold">Miembros</h1>
          <div className="m-2 flex flex-col">
            <p>No hay miembros</p>
          </div>
        </div>
      )
    }
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

  function SolicitudesList() {
    if (loadingGroupInfo) return <p>Cargando...</p>;
    if (errorGroupInfo) return <p>Error</p>;

    const userFoto = (foto_perfil) => {
      if (foto_perfil) {
        return <img src={foto_perfil} className="h-6 w-6 rounded-full" />;
      } else {
        return <AiOutlineUser className="h-6 w-6" />;
      }
    };

    if (dataGroupInfo?.buscarGrupoId?.solicitudes?.length === 0) {
      return (
        <div className="bg-slate flex flex-col p-2">
          <h1 className="text-2xl font-semibold">Solicitudes</h1>
          <div className="m-2 flex flex-col">
            <p>No hay solicitudes</p>
          </div>
        </div>
      );
    }

    return (
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
    );
  }

  console.log("isAdmin?", isAdmin());

  return (
    <>
      <div className="z-10 mt-[80px]  w-[100vw] max-w-[100vw] text-current lg:w-[55vw] lg:max-w-[90vw] lg:px-10">
        <div className="mt-4 flex-col items-center  justify-between text-[5vw] font-bold sm:text-[18px] ">
          <GroupHeader
            GroupName={dataGroupInfo?.buscarGrupoId?.nombre}
            GroupId={groupId}
            isAdmin={isAdmin()}
            GroupBanner={dataGroupInfo?.buscarGrupoId?.banner}
          />
          {/* listas container */}
          <div className="grid grid-cols-3 rounded-md bg-foreground text-primary">
            {/* lista miembros */}
            <div className="col-span-1 m-2 hidden h-fit flex-col rounded-md bg-background p-2   lg:flex">
              {MemberList()}
            </div>
            {/* lista administradores */}
            <div className="col-span-1 m-2 hidden h-fit flex-col rounded-md bg-background p-2  lg:flex">
              {AdminList()}
            </div>
            {/* lista solicitudes */}
            <div className="col-span-1 m-2 hidden h-fit flex-col rounded-md bg-background p-2  lg:flex">
              {SolicitudesList()}
            </div>
            {/* Publicaciones container */}
            <div className=""></div>
          </div>
        </div>
      </div>
    </>
  );
}

Members.getLayout = function getLayout(page, screenWidth) {
  return <Home screenWidth={screenWidth}>{page}</Home>;
};
