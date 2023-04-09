import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Header from "@/components/header";
import ProfileDisplay from "@/components/profileDisplay";
import RecentGroups from "@/components/recentGroups";
import GroupHeader from "@/components/groupHeader";
import PublicationInput from "@/components/publicationInput";
import { useEffect, useState } from "react";
import FriendList from "@/components/friendList";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [publications, setPublications] = useState([
    {
      id: 1,
      author: "Juan Carlos Bodoque",
      authorImg: "/bodoque.jpeg",
      group: "31 Minutos",
      content: "Hola, soy Juan Carlos Bodoque",
      images: ["/juanin.png", "/juanin.png"],
      date: "2021-10-10",
      likes: 0,
      dislikes: 0,
      comments: 0,
    },
    {
      id: 2,
      author: "Juan Carlos Bodoque",
      authorImg: "/bodoque.jpeg",
      group: "31 Minutos",
      content: "HOLA xuxetas",
      images: [],
      date: "2021-10-10",
      likes: 0,
      dislikes: 0,
      comments: 0,
    },
  ]);

  const [comments, setComments] = useState([
    {
      id: 1,
      publicationId: 1,
      content: "Hola, soy Juan Carlos Bodoque",
      images: ["/juanin.png", "/juanin.png"],
      date: "2021-10-10",
      likes: 0,
      dislikes: 0,
      comments: 0,
    },
    {
      id: 2,
      publicationId: 1,
      content: "HOLA xuxetas",
      images: [],
      date: "2021-10-10",
      likes: 0,
      dislikes: 0,
      comments: 0,
    },
  ]);

  // map de publicaciones
  const publicationList = publications.map((publication) => {
    const fetchComments = () => {
      // consutla a la base de datos
      // setComments([]);
    };

    // mapeo de comentarios
    const commentList = comments.map((comment) => {
      if (comment.publicationId === publication.id) {
        return (
          <div key={comment.id}>
            <div className="flex flex-row items-center gap-2 p-2">
              <Image
                src={publication.authorImg}
                alt="Foto Perfil"
                className="rounded-full "
                height={50}
                width={50}
              />
              <h1 className=" font-semibold">{publication.author}</h1>
              <div className="h-2 w-2 rounded-full bg-[#e2e2e2]"></div>
              <h1>{comment.date}</h1>
            </div>
          </div>
        );
      } else {
        return null;
      }
    });

    console.log(commentList);
    console.log(commentList === null);
    return (
      <>
        <div
          className="mb-4 h-fit w-full rounded-md bg-white shadow-lg"
          key={publication.id}
        >
          {/* header */}
          <div className=" flex flex-row items-center gap-2   p-2">
            <Image
              src={publication.authorImg}
              alt="Foto Perfil"
              className="rounded-full "
              height={50}
              width={50}
            />
            <h1 className="text-lg font-semibold">{publication.author}</h1>
            <div className="h-2 w-2 rounded-full bg-[#e2e2e2]"></div>
            <h1>{publication.group}</h1>
            <div className="h-2 w-2 rounded-full bg-[#e2e2e2]"></div>
            <h2>{publication.date}</h2>
          </div>
          {/* contenido de la publicacion */}
          <div className="m-2">
            <p className="">{publication.content}</p>
            {/* contenedor de images si corresponde */}
            <div className="flex justify-center">
              <div className="my-2 flex h-1/5 w-1/5 flex-row justify-center gap-2">
                {publication.images.map((image) => (
                  <Image
                    key={Math.random()}
                    src={image}
                    alt="Foto Perfil"
                    className="h-full rounded-md shadow-md hover:opacity-80"
                    height={1000}
                    width={1000}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* footer */}
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
            <div className="">
              <textarea
                type="text"
                className="h-10 w-full resize-none rounded-md p-2  transition-all duration-500 ease-in-out focus:h-20"
                placeholder="Comentar"
              />
            
            </div>
            
              {(commentList[0] !== null)? <div className="h-1 m-4 rounded-md  bg-[#e2e2e2]"></div>:<></>}
            {/* comentarios agenos contenedor */}
            <div className="m-2 ">
              {/* comentarios agenos */}
              
              {commentList}
            </div>
          </div>
        </div>
      </>
    );
  });

  return (
    <div className="bg-[#e2e2e2]">
      <Head>
        <title>RC UBB</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <script></script>

      <main className="min-h-screen">
        {/* Header */}
        <Header />

        {/* content */}
        <div className=" grid  w-screen grid-flow-col grid-cols-5">
          {/* Perfil y grupos recientes(?) */}
          <div className="col-span-1 m-2 hidden h-fit flex-col rounded-md  bg-white p-2 text-black  shadow-xl lg:flex">
            {/* perfil */}
            <ProfileDisplay />

            {/* grupos recientes */}
            <RecentGroups />
          </div>

          {/* Publicaciones / feed */}
          <div className="bg-slate- col-span-5  p-2 lg:col-span-3">
            {/* publiacaiones cards */}
            {publicationList}
          </div>
          <div className="col-span-1 m-2 hidden h-fit flex-col rounded-md bg-white p-2 text-black  shadow-xl lg:flex">
            {/* Lista de amigos */}
            <div>
              <h1 className="text-2xl font-semibold">Amigos</h1>
            </div>
            {/* Lista */}
            <FriendList />
          </div>
        </div>

        {/* chat */}
        <div className=" fixed bottom-1 right-4  h-10 w-48 rounded-md bg-white ">
          <div className="bg-slate flex flex-col p-2">
            <h1 className="font-semibold">Chat</h1>
          </div>
        </div>
      </main>
    </div>
  );
}
