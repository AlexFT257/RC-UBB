import React from "react";
import GroupHeader from "../components/groupHeader";
import PublicationInput from "../components/publicationInput";
import Image from "next/image";
import { useEffect, useState } from "react";
import Head from "next/head";
import Header from "../components/header";
import ProfileDisplay from "../components/profileDisplay";
import RecentGroups from "../components/recentGroups";
import FriendList from "../components/friendList";

export default function GroupPage() {
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

        <script></script>

        <main className="min-h-screen dark:bg-[url(/BackgroundStars.jpg)] dark:bg-cover dark:bg-fixed">
          {/* Header */}
          <Header />

          {/* content */}
          <div className=" grid  w-screen grid-flow-col grid-cols-5">
            {/* Perfil y grupos recientes(?) */}
            <div className="col-span-1 dark:bg-[#231842] dark:text-[#a9dacb] m-2 hidden h-fit flex-col rounded-md  bg-white p-2 text-black  shadow-xl lg:flex">
              {/* perfil */}
              <ProfileDisplay />

              {/* grupos recientes */}
              <RecentGroups />
            </div>

            {/* Publicaciones / feed */}
            <div className="bg-slate- col-span-5  p-2 lg:col-span-3">
              {/* publiacaiones cards */}
              {/* Group header */}
              <GroupHeader />
              {/* Input para publicar */}
              <PublicationInput />

              {/* Publicaciones container */}
              <div className="">
                {/* publicacion "card" */}
                <div className="mt-4 flex flex-col rounded-md  dark:bg-[#231842] dark:text-[#a9dacb]  bg-white  p-2 text-black shadow-2xl ">
                  {/* perfil del que publica */}
                  <div className=" m- flex flex-row items-center   gap-2">
                    <Image
                      src="/bodoque.jpeg"
                      alt="Foto Perfil"
                      className="rounded-full "
                      height={50}
                      width={50}
                    />
                    <h1 className="text-lg font-semibold">
                      Juan Carlos Bodoque
                    </h1>
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                    <h2>{date.toLocaleString("en-GB")}</h2>
                  </div>
                  {/* contenido de la publicacion */}
                  <div className="m-2">
                    <p className="">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quisquam, quod. Lorem ipsum dolor sit amet consectetur
                      adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit
                      amet consectetur adipisicing elit. Quisquam, quod. Lorem
                      ipsum dolor sit amet consectetur adipisicing elit.
                      Quisquam, quod. Lorem ipsum dolor sit amet consectetur
                      adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit
                      amet consectetur adipisicing elit. Quisquam, quod. Lorem
                      ipsum dolor sit amet
                    </p>
                    {/* contenedor de images si corresponde */}
                    <div className="flex justify-center">
                      <div className="my-2 flex h-1/5 w-1/5 flex-row justify-center gap-2">
                        <Image
                          src="/juanin.png"
                          alt="Foto"
                          className="h-full  rounded-md hover:opacity-80"
                          height={1000}
                          width={1000}
                        />
                        <Image
                          src="/juanin.png"
                          alt="Foto"
                          className="h-full  rounded-md hover:opacity-80"
                          height={1000}
                          width={1000}
                        />
                        <Image
                          src="/juanin.png"
                          alt="Foto"
                          className="h-full  rounded-md hover:opacity-80"
                          height={1000}
                          width={1000}
                        />
                        <Image
                          src="/juanin.png"
                          alt="Foto"
                          className="h-full  rounded-md hover:opacity-80"
                          height={1000}
                          width={1000}
                        />
                      </div>
                    </div>
                  </div>

                  {/* footer de la publicacion */}
                  <div className=" bg-slate-">
                    {/* informacion de publicacion */}
                    <div className="m-2 flex flex-row gap-2  font-semibold md:justify-between">
                      {/* left side */}
                      <div className="flex flex-row gap-2">
                        <h1 className=" ">Likes</h1>
                        <h1>{32124}</h1>
                        <h1>Dislike</h1>
                        <h1>{123}</h1>
                        <h1>Comentarios</h1>
                        <h1>{123}</h1>
                      </div>
                      {/* right side */}
                      <div>
                        <h1 className="hover:cursor-pointer hover:opacity-80 active:opacity-70">
                          Compartir
                        </h1>
                        {/* inserte icono(?) */}
                      </div>
                    </div>
                    {/* input para comentar */}
                    <div className="flex">
                      <textarea
                        type="text"
                        className="h-10 dark:bg-bgDarkColor  dark:text-[#a9dacb] w-full resize-none rounded-md p-2  transition-all duration-500 ease-in-out focus:h-20"
                        placeholder="Comentar"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-1 dark:bg-[#231842] dark:text-[#a9dacb] m-2 hidden h-fit flex-col rounded-md bg-white p-2 text-black  shadow-xl lg:flex">
              {/* Lista de amigos */}
              <div>
                <h1 className="text-2xl font-semibold">Amigos</h1>
              </div>
              {/* Lista */}
              <FriendList />
            </div>
          </div>

          {/* chat */}
          <div className=" fixed bottom-1 right-4  h-10 w-48 rounded-md dark:bg-[#231842] dark:text-[#a9dacb] bg-white ">
            <div className="bg-slate flex flex-col p-2">
              <h1 className="font-semibold">Chat</h1>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
