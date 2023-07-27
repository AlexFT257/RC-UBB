import React from "react";
import GroupHeader from "../../components/groupHeader";
import PublicationInput from "../../components/publicationInput";
import { useEffect, useState, useContext } from "react";
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
import Home from "@/components/home";
import { UserContext } from "@/utils/userContext";
import PostPublish from "@/components/PostPublish";

export default function GroupHome() {
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

  console.log("isAdmin?", isAdmin());

  const [date, setDate] = useState("");
  useEffect(() => {
    const date = new Date();
    setDate(date);
  }, []);

  //

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
            {/* Input para publicar */}
            <PostPublish user={user} />

            {/* Publicaciones container */}
            <div className=""></div>
        </div>
      </div>
    </>
  );
}

GroupHome.getLayout = function getLayout(page, screenWidth) {
  return <Home screenWidth={screenWidth}>{page}</Home>;
};
