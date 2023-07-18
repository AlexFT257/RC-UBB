import React from "react";
import GroupHeader from "../../components/groupHeader";
import PublicationInput from "../../components/publicationInput";
import { useEffect, useState } from "react";
import Head from "next/head";
import Header from "../../components/header";
import ProfileDisplay from "../../components/profileDisplay";
import RecentGroups from "../../components/recentGroups";
import FriendList from "../../components/friendList";
import EventList from "@/components/eventList";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import { data } from "autoprefixer";
import { getItem } from "@/utils/localStorage";
import jwt from "jsonwebtoken";

export default function GroupPage() {
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
        descripcion
        privacidad
        icono
        banner
        admins {
          id
          nombre
          apellido
          username
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

  console.log("isAdmin?", isAdmin());

  const [date, setDate] = useState("");
  useEffect(() => {
    const date = new Date();
    setDate(date);
  }, []);

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
              {/* Input para publicar */}
              <PublicationInput />

              {/* Publicaciones container */}
              <div className=""></div>
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
