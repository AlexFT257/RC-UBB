import React from "react";
import Header from "@/components/header";
import ProfileDisplay from "@/components/profileDisplay";
import RecentGroups from "@/components/recentGroups";
import Image from "next/image";

export default function Profile() {
  const [profileData, setProfileData] = React.useState({
    name: "Juan Carlos",
    lastName: "Bodoque",
    university: "Universidad del Bío-Bío",
    career: "Ingeniería Civil en Computación",
    email: "juan.bodoque1901@alumnos.ubiobio.cl",
  });

  return (
    <>
      {/* container */}
      <div className="h-screen bg-[#e2e2e2] dark:bg-bgDarkColor dark:text-[#a9dacb]">
        {/* header */}
        <Header />
        {/* content */}
        <div className="grid  grid-flow-col  grid-cols-5">
          {/* Perfil y grupos recientes(?) */}
          <div className="col-span-1 dark:bg-[#231842] dark:text-[#a9dacb] m-2 hidden h-fit flex-col rounded-md  bg-white p-2 text-black  shadow-xl lg:flex">
            {/* perfil */}
            <ProfileDisplay />
            {/* grupos recientes */}
            <RecentGroups />
          </div>

          {/* Perfil editable*/}
          <div className="col-span-5 m-2 flex dark:bg-[#231842] dark:text-[#a9dacb]  flex-col items-center gap-4 rounded-md bg-white p-2 shadow-xl lg:col-span-3">
            <h1 className="text-4xl font-semibold m-2">Editar Perfil</h1>
            {/* foto de perfil */}
            <div className="m-2 flex items-center  gap-2">
              <Image
                src="/bodoque.jpeg"
                alt="Foto Perfil"
                className="rounded-full border shadow-xl"
                height={200}
                width={200}
              />
            </div>
            {/* datos para editar*/}
            <div className="flex  w-full flex-col lg:w-2/4">
              <div className="flex flex-row  gap-2">
                <div className=" flex  flex-col gap-2  text-lg md:m-4">
                  <h1 className="p-2  font-semibold">Nombre</h1>
                  <h1 className="p-2 font-semibold">Apellido</h1>
                  <h1 className="p-2 font-semibold">Universidad</h1>
                  <h1 className="p-2 font-semibold">Carrera</h1>
                  <h1 className="p-2 font-semibold">Email</h1>
                </div>
                <div className="m-2 flex w-1/2 grow flex-col gap-2 text-lg md:m-4 md:w-fit">
                  <input
                    className="rounded-md bg-[#e2e2e2] dark:bg-bgDarkColor dark:text-[#a9dacb] p-2"
                    type="text"
                    placeholder={profileData.name}
                  />
                  <input
                    className="rounded-md bg-[#e2e2e2] dark:bg-bgDarkColor p-2"
                    type="text"
                    placeholder={profileData.lastName}
                  />
                  <input
                    className="cursor-not-allowed rounded-md bg-[#e2e2e2] dark:bg-bgDarkColor p-2"
                    type="text"
                    placeholder={profileData.university}
                    disabled
                  />
                  <input
                    className="cursor-not-allowed rounded-md bg-[#e2e2e2] dark:bg-bgDarkColor p-2"
                    type="text"
                    placeholder={profileData.career}
                    disabled
                  />
                  <input
                    className="rounded-md bg-[#e2e2e2] dark:bg-bgDarkColor p-2 "
                    type="text"
                    placeholder={profileData.email}
                  />
                </div>
              </div>
              <button className="rounded dark:hover:bg-textDarkColor dark:bg-bgDarkColorTrasparent dark:hover:text-bgDarkColor dark:text-textDarkColor transition-all delay-75 ease-in-out duration-500 bg-green-500  px-4 py-2 font-bold  text-white hover:bg-green-700 active:bg-green-900">
                actualizar
              </button>
            </div>
            {/* botones */}
          </div>
        </div>
      </div>
    </>
  );
}
