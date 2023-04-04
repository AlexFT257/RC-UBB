import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Header from "@/components/header";
import Profile from "@/components/profile";
import RecentGroups from "@/components/recentGroups";
import GroupHeader from "@/components/groupHeader";
import PublicationInput from "@/components/publicationInput";
import { format } from "prettier";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  let date = new Date();
  return (
    <div className="">
      <Head>
        <title>RC UBB</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        {/* Header */}
        <Header />

        {/* content */}
        <div className=" grid  grid-flow-col grid-cols-5">
          {/* Perfil y grupos recientes(?) */}
          <div className="bg-slate-  col-span-1 hidden flex-col  p-2 lg:flex">
            {/* perfil */}
            <Profile />

            {/* grupos recientes */}
            <RecentGroups />
          </div>

          {/* Publicaciones */}
          <div className="bg-slate- col-span-5  p-2 lg:col-span-3">
            {/* Group header */}
            <GroupHeader />
            {/* Input para publicar */}
            <PublicationInput />

            {/* Publicaciones container */}
            <div className="">
              {/* publicacion "card" */}
              <div className="m-2 flex flex-col rounded-md bg-slate-600 p-2 ">
                {/* perfil del que publica */}
                <div className=" m-2 flex flex-row items-center   gap-2">
                  <Image
                    src="/bodoque.jpeg"
                    alt="Foto Perfil"
                    className="rounded-full "
                    height={50}
                    width={50}
                  />
                  <h1 className="text-lg font-semibold">Juan Carlos Bodoque</h1>
                  <div className="h-2 w-2 rounded-full bg-white"></div>
                  <h2>{date.toLocaleString("en-GB")}</h2>
                </div>
                {/* contenido de la publicacion */}
                <div className="">
                  <p className="">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, quod. Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Quisquam, quod. Lorem ipsum
                    dolor sit amet consectetur adipisicing elit. Quisquam, quod.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, quod. Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet
                  </p>
                  {/* contenedor de images si corresponde */}
                  <div className="flex justify-center">
                    <div className="my-2 grid h-1/3 w-1/3 grid-cols-2 grid-rows-1 gap-2 ">
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
                  <div>
                    <textarea
                      type="text"
                      className="h-10 w-full resize-none rounded-md p-2  transition-all duration-500 ease-in-out focus:h-20"
                      placeholder="Comentar"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-slate- col-span-1 hidden flex-col  p-2 lg:flex">
            {/* Lista de amigos */}
            <div>
              <h1 className="text-2xl font-semibold">Amigos</h1>
            </div>
            {/* Lista de grupos */}
            <div>
              <ul>
                <li className="m-2 flex cursor-pointer flex-row items-center gap-2 hover:opacity-80 active:opacity-60">
                  <div className="h-2 w-2 rounded-full bg-green-300"></div>
                  <h1 className="text-lg font-semibold">Juan Carlos Bodoque</h1>
                </li>

                <li className="m-2 flex cursor-pointer flex-row items-center gap-2 hover:opacity-80 active:opacity-60">
                  <div className="h-2 w-2 rounded-full bg-green-300"></div>
                  <h1 className="text-lg font-semibold">Juanin Juan Harry</h1>
                </li>
              </ul>

              <li className="m-2 flex cursor-pointer flex-row items-center gap-2 hover:opacity-80 active:opacity-60">
                <div className="h-2 w-2 rounded-full bg-gray-300"></div>
                <h1 className="text-lg font-semibold">Tulio Triviño</h1>
              </li>
            </div>
          </div>
        </div>

        {/* chat */}
        <div className=" fixed bottom-1 right-0  h-10 w-48 rounded-md bg-slate-800 ">
          <div className="bg-slate flex flex-col p-2">
            <h1 className="font-semibold">Chat</h1>
          </div>
        </div>
      </main>
    </div>
  );
}
