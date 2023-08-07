import Image from "next/image";
import { useEffect, useState } from "react";


export default function Publication({GroupName}) {

    return (
        <>
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
        </>
    )
}
