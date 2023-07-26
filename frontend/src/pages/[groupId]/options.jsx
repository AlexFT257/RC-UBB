import React, { use } from "react";
import GroupHeader from "../../components/groupHeader";
import { useEffect, useState } from "react";
import Head from "next/head";
import Header from "../../components/header";
import ProfileDisplay from "../../components/profileDisplay";
import RecentGroups from "../../components/recentGroups";
import FriendList from "../../components/friendList";
import EventList from "@/components/eventList";
import { useRouter } from "next/router";
import { gql, useQuery, useMutation } from "@apollo/client";
import { getItem } from "@/utils/localStorage";
import jwt from "jsonwebtoken";
import { HiOutlineUserGroup } from "react-icons/hi";
import BannerPreview from "@/components/bannerPreview";
import IconPreview from "@/components/iconPreview";
import { hasForbiddenWords } from "@/utils/validationUtils";
import { base64ToImage, imageToBase64 } from "@/utils/imageUtils";

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
    return dataGroupInfo?.buscarGrupoId?.admins?.some(
      (admin) => admin.id === decoded.id
    );
  };

  console.log("isAdmin?", isAdmin());

  const [groupInfo, setGroupInfo] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    privacidad: "",
    icono: "",
    banner: "",
  });

  const [selectedIcon, setSelectedIcon] = useState(null);
  const [selectedBanner, setSelectedBanner] = useState(null);

  //las imagenes se guardan como base64
  const handleIconChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setSelectedIcon(reader.result);
      }
    };

    if (file) {
      reader.readAsDataURL(e.target.files[0]);
    }
    console.log("selectedIcon", selectedIcon);
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setSelectedBanner(reader.result);
      }
    };

    if (file) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const specialCharsRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;

  const hasSpecialChars = (input) => {
    return specialCharsRegex.test(input);
  };

  useEffect(() => {
    if (dataGroupInfo && dataGroupInfo.buscarGrupoId) {
      setGroupInfo({
        id: dataGroupInfo.buscarGrupoId.id,
        nombre: dataGroupInfo.buscarGrupoId.nombre,
        descripcion: dataGroupInfo.buscarGrupoId.descripcion,
        privacidad: dataGroupInfo.buscarGrupoId.privacidad,
        icono: dataGroupInfo.buscarGrupoId.icono,
        banner: dataGroupInfo.buscarGrupoId.banner,
      });
    }
  }, [dataGroupInfo]);

  //editarGrupo(id: ID!, nombre: String, privacidad: String, vencimiento: Date, descripcion: String, admins: [ID], miembros: [ID], icono: String, banner: String): Grupo

  const EDITAR_GRUPO_MUTATION = gql`
    mutation editarGrupo(
      $id: ID!
      $nombre: String
      $privacidad: String
      $descripcion: String
      $icono: String
      $banner: String
    ) {
      editarGrupo(
        id: $id
        nombre: $nombre
        privacidad: $privacidad
        descripcion: $descripcion
        icono: $icono
        banner: $banner
      ) {
        id
        nombre
        descripcion
        privacidad
        icono
        banner
      }
    }
  `;

  const [editarGrupo, { loading: loadingEdit, error: errorEdit }] = useMutation(
    EDITAR_GRUPO_MUTATION,
    {
      variables: {
        id: groupInfo.id,
        nombre: groupInfo.nombre,
        privacidad: groupInfo.privacidad,
        descripcion: groupInfo.descripcion,
        icono: selectedIcon,
        banner: selectedBanner,
      },
      onCompleted: () => {
        alert("Grupo editado correctamente");
        router.push(`/${groupId}/options`);
      },
      onError: (error) => {
        alert(error.message);
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("groupInfo", groupInfo);
    if (hasForbiddenWords(groupInfo.nombre)) {
      alert("El nombre del grupo no puede contener palabras prohibidas");
      return;
    }
    if (hasForbiddenWords(groupInfo.descripcion)) {
      alert("La descripción del grupo no puede contener palabras prohibidas");
      return;
    }
    if (hasSpecialChars(groupInfo.nombre)) {
      alert("El nombre del grupo no puede contener caracteres especiales");
      return;
    }
    if (hasSpecialChars(groupInfo.descripcion)) {
      alert("La descripción del grupo no puede contener caracteres especiales");
      return;
    }

    // las imagenes ya estan en base 64
    // por lo que se puede subir directamente
    // console.log("selectedIcon", selectedIcon);
    // console.log("selectedBanner", selectedBanner);

    editarGrupo();
  };

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
            <div className="p-2text-black  col-span-1 m-2 hidden h-fit flex-col rounded-md shadow-xl  dark:text-[#a9dacb] lg:flex">
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
                GroupBanner={dataGroupInfo?.buscarGrupoId?.banner}
              />

              {/* Opciones container */}
              <div className="grid gap-4 rounded-md bg-accentDarkColor p-2 text-textDarkColor lg:grid-cols-2">
                <form
                  action=""
                  onSubmit={handleSubmit}
                  className="flex w-full flex-col justify-between"
                >
                  <div className="flex flex-col">
                    <label htmlFor="nombre" className="text-xl font-semibold">
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      id="nombre"
                      className="rounded-md p-2"
                      value={groupInfo.nombre}
                      onChange={(e) =>
                        setGroupInfo({
                          ...groupInfo,
                          nombre: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="descripcion"
                      className="text-xl  font-semibold"
                    >
                      Descripción
                    </label>
                    <input
                      type="text"
                      name="descripcion"
                      id="descripcion"
                      className="rounded-md p-2"
                      value={groupInfo.descripcion}
                      onChange={(e) =>
                        setGroupInfo({
                          ...groupInfo,
                          descripcion: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="privacidad"
                      className="text-xl font-semibold"
                    >
                      Privacidad
                    </label>
                    <select
                      name="privacidad"
                      id="privacidad"
                      className="rounded-md p-2"
                      value={groupInfo.privacidad}
                      onChange={(e) =>
                        setGroupInfo({
                          ...groupInfo,
                          privacidad: e.target.value,
                        })
                      }
                    >
                      <option value="publico">Público</option>
                      <option value="privado">Privado</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="icono" className="text-xl font-semibold">
                      Icono
                    </label>
                    <input
                      type="file"
                      name="icono"
                      id="icono"
                      className="w-2/3 rounded-md px-3 py-2 focus:border-blue-500 focus:outline-none"
                      onChange={handleIconChange}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="banner" className="text-xl font-semibold">
                      Banner
                    </label>
                    <input
                      type="file"
                      name="banner"
                      id="banner"
                      className="rounded-md p-2"
                      onChange={handleBannerChange}
                    />
                  </div>
                  <div className="flex w-full justify-center">
                    <button
                      type="submit"
                      className="m-2 w-1/3 rounded-md bg-bgDarkColorTrasparent p-2 text-xl font-bold hover:bg-bgDarkColor"
                    >
                      Guardar
                    </button>
                  </div>
                </form>
                {/* preview de icono y banenr */}
                <div className="grid grid-rows-2 ">
                  <div className="flex flex-col gap-2">
                    <h1 className="border-b text-2xl font-semibold">Icono</h1>
                    <IconPreview
                      icon={selectedIcon ? selectedIcon : groupInfo.icono}
                      name={groupInfo.nombre}
                      descripcion={groupInfo.descripcion}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h1 className="border-b text-2xl  font-semibold">Banner</h1>
                    <BannerPreview
                      name={groupInfo.nombre}
                      banner={
                        selectedBanner ? selectedBanner : groupInfo.banner
                      }
                    />
                  </div>
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