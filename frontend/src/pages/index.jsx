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
import { randomUUID } from "crypto";
import EventList from "@/components/eventList";
import {
  AiOutlineCaretRight,
  AiOutlineMenu,
  AiOutlineLike,
  AiOutlineMessage,
  AiOutlineMore,
  AiOutlineShareAlt,
  AiOutlineSend,
  AiOutlinePicture,
} from "react-icons/ai";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [publications, setPublications] = useState([
    {
      id: 1,
      author: "Juan Carlos Bodoque",
      authorImg: "/bodoque.jpeg",
      group: "31 Minutos",
      content: "Hola, soy Juan Carlos Bodoque",
      images: ["/juanin.png", "/tulio.png", "/bodoque.jpeg", "/juanin.png"],
      date: "2023-04-22",
      likes: 123,
      dislikes: 0,
      comments: 2,
    },
    {
      id: 2,
      author: "Juan Carlos Bodoque",
      authorImg: "/bodoque.jpeg",
      group: "31 Minutos",
      content: "HOLA xuxetas",
      images: [],
      date: "2021-10-10",
      likes: 23,
      dislikes: 0,
      comments: 0,
    },
  ]);

  const [comments, setComments] = useState([
    {
      id: 1,
      publicationId: 1,
      author: "Juan Carlos Bodoque",
      content: "Hola, soy Juan Carlos Bodoque",
      images: ["/juanin.png", "/juanin.png"],
      date: "2023-04-10",
      likes: 12,
      dislikes: 0,
      comments: 3,
    },
    {
      id: 2,
      publicationId: 1,
      author: "Juan Carlos Bodoque",
      content: "HOLA xuxetas",
      images: [],
      date: "2023-10-10",
      likes: 0,
      dislikes: 0,
      comments: 0,
    },
  ]);

  // realizar fetch a la api
  useEffect(() => {
    // fetch a la api
    // setPublications(data);
  }, []);

  const dateParsed = (fechaPublicacion) => {
    const fechaActual = new Date();
    const fechaPublicacionDate = new Date(fechaPublicacion);

    const diferencia = fechaActual - fechaPublicacionDate;

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor(diferencia / (1000 * 60 * 60));
    const minutos = Math.floor(diferencia / (1000 * 60));

    if (dias > 30) {
      return fechaPublicacionDate.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } else if (dias > 0) {
      return `${dias} dias`;
    } else if (horas > 0) {
      return `${horas} horas`;
    } else if (minutos > 0) {
      return `${minutos} minutos`;
    } else {
      return "hace un momento";
    }
  };

  // map de publicaciones
  const publicationList = publications.map((publication) => {
    // mapeo de comentarios
    const commentList = comments.map((comment) => {
      if (comment.publicationId === publication.id) {
        return (
          // contenedor del comentario
          <div
            key={comment.id}
            className="my-2 rounded-md shadow-md  dark:bg-bgDarkColorTrasparent dark:text-[#a9dacb]"
          >
            <div className=" flex flex-row items-center justify-between gap-2   p-2">
              <div className="flex items-center gap-2 align-middle">
                <Image
                  src={publication.authorImg}
                  alt="Foto Perfil"
                  className="rounded "
                  height={50}
                  width={50}
                />
                {/* div para la fecha y nombre de usuario */}
                <div className="flex flex-col gap-2">
                  {/* div nombre y fecha */}
                  <div className="flex items-center gap-2">
                    <h1 className=" font-semibold">{comment.author}</h1>
                    <h2 className="text-sm text-gray-500">
                      {dateParsed(comment.date)}
                    </h2>
                  </div>
                  {/* div contenido comentario */}
                  <div>
                    <p>{comment.content}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 p-2">
                <AiOutlineLike className="text-2xl" />
                <h1 className="">{comment.likes}</h1>
                <AiOutlineMessage className="text-2xl" />
                <h1 className="">{comment.comments}</h1>
                <AiOutlineMore className="text-2xl" />
              </div>
            </div>
            {/* contenido del comentario */}
          </div>
        );
      } else {
        return null;
      }
    });

    const imagesHandler = (images) => {
      if (images.length < 0) {
        return <></>;
      } else if (images.length === 1) {
        return (
          <div key={randomUUID} className="flex justify-center">
            <Image
              src={images[0]}
              alt="Foto Perfil"
              className="w-full rounded "
              height={500}
              width={500}
            />
          </div>
        );
      } else if (images.length === 2) {
        return (
          <div key={randomUUID} className="grid grid-cols-2 m-2 gap-2">
            {images.map((image) => (
              <Image
                src={image}
                alt="Foto Perfil"
                className="  rounded "
                height={500}
                width={500}
              />
            ))}
          </div>
        );
      } else if (images.length === 3) {
        
        
        return (
          <div key={randomUUID} className="grid gap-2  grid-cols-2 grid-rows-2">
            {images.map((image, index) => {
              if(index === 0){
                return (
                  <Image
                    src={image}
                    alt="Foto Perfil"
                    className="rounded h-full row-span-2"
                    height={1000}
                    width={500}
                  />
                )
              }else{
                return (
                  <Image
                  src={image}
                  alt="Foto Perfil"
                  className="rounded  row-span-1"
                  height={500}
                  width={500}
                />
                )
              }


      })}


          </div>
        );
      } else if (images.length === 4 || images.length > 4) {
        return (
          <div key={randomUUID} className="grid gap-2 grid-cols-2 grid-rows-2">
            {/* quedaron terrible grandes las imagenes perdon :c */}
            {images.map((image) => {
              return (
                <Image
                  src={image}
                  alt="Foto Perfil"
                  className="rounded "
                  height={500}
                  width={500}
                />
              );
            })}
          </div>
        );
      }
    };

    console.log(commentList);
    console.log(commentList === null);
    return (
      <>
        <div
          className="mb-4  w-full rounded-md bg-white shadow-lg dark:bg-[#231842]  dark:text-[#a9dacb]"
          key={publication.id}
        >
          {/* header */}
          <div className=" flex flex-row items-center justify-between gap-2   p-4">
            <div className="flex items-center gap-2 align-middle">
              <Image
                src={publication.authorImg}
                alt="Foto Perfil"
                className="rounded "
                height={60}
                width={60}
              />
              {/* div para la fecha y nombre de usuario */}
              <div>
                <h1 className=" font-semibold">{publication.author}</h1>
                <h2 className="text-sm text-gray-500">
                  {dateParsed(publication.date)}
                </h2>
              </div>
              <AiOutlineCaretRight className="h-4 w-4" />
              <h1 className=" font-semibold">{publication.group}</h1>
            </div>
            <div className="flex p-2">
              <AiOutlineMenu className="text-2xl" />
            </div>
          </div>
          {/* contenido de la publicacion */}
          <div className="m-2 p-2">
            <p className="">{publication.content}</p>
            {/* contenedor de images si corresponde */}
            <div className="flex justify-center">
              {imagesHandler(publication.images)}
            </div>
          </div>
          {/* footer */}
          <div className=" bg-slate- ">
            {/* informacion de publicacion */}
            <div className="m-2  flex flex-row items-center gap-2  font-semibold md:justify-between">
              {/* left side */}
              <div className="flex flex-row items-center gap-2">
                <button className=" ">
                  <AiOutlineLike className="text-2xl" />
                </button>
                <h1>{publication.likes}</h1>
                <div className="flex gap-2 ">
                  <AiOutlineMessage className="text-2xl" />
                  <h1>{publication.comments}</h1>
                </div>
              </div>
              {/* right side */}
              <button className="flex p-2 hover:cursor-pointer hover:opacity-80 active:opacity-70">
                <AiOutlineShareAlt className="text-2xl" />
              </button>
              {/* inserte icono(?) */}
            </div>

            {commentList[0] !== null ? (
              <div className="m-4 h-1 rounded-md  bg-[#e2e2e2] dark:bg-bgDarkColorTrasparent"></div>
            ) : (
              <></>
            )}
            {/* comentarios agenos contenedor */}
            <div className="m-2 ">
              {/* comentarios agenos */}
              {commentList}
            </div>
            {/* input para comentar */}
            <div className="flex items-center gap-2">
              <AiOutlinePicture className="ml-4 text-3xl" />
              <textarea
                type="text"
                className="m-2 h-10 w-full resize-none rounded-md p-2 transition-all duration-500  ease-in-out focus:h-20 dark:bg-[#03001c] dark:text-[#a9dacb]"
                placeholder="Comentar"
              />
              <AiOutlineSend className="mr-4 text-3xl" />
            </div>
          </div>
        </div>
      </>
    );
  });

  return (
    
    <div className="bg-[#e2e2e2]  dark:bg-[#03001C]">
      <Head>
        <title>RC UBB</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <script></script>

      <main className="min-h-screen ">
        {/* Header */}
        <Header className="sticky top-0" />

        {/* content */}
        <div className=" grid  w-screen grid-flow-col grid-cols-5 ">
          {/* Perfil y grupos recientes(?) */}
          <div className="col-span-1  m-2 hidden h-fit flex-col rounded-md p-2 text-black  shadow-xl lg:flex">
            {/* perfil */}
            <ProfileDisplay />

            {/* grupos recientes */}
            <RecentGroups />
          </div>

          {/* Publicaciones / feed */}
          <div className="bg-slate- col-span-5 p-2 transition-all delay-75 duration-300  ease-in-out lg:col-span-3">
            {/* publiacaiones cards */}
            {publicationList}
          </div>
          <div className="col-span-1  hidden  flex-col rounded-md  p-2   shadow-xl lg:flex">
            {/* lista de enventos */}
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
    
  );
}
