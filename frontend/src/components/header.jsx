import Profile from "@/pages/profile";
import Image from "next/image";
import Link from "next/link";
import {
  AiOutlineSearch,
  AiOutlineHome,
  AiOutlineCalendar,
  AiOutlineGroup,
  AiOutlineIdcard,
} from "react-icons/ai";

export default function Header() {
  return (
    <>
      {/*  gradient-to-t from-[#E2E2E2]  to-[#B2B2B2] */}
      <header className="mb-2   flex flex-row  items-center justify-evenly bg-white p-4   font-semibold text-black shadow-xl dark:bg-[#231842]  dark:text-[#a9dacb]">
        {/* left side */}
        <div className="mx-auto hidden flex-row items-center md:flex  md:w-1/3">
          <Image src="/LogoUchat.png" alt="Icono" width={100} height={50} />
        </div>
        <div className="bg- mx-auto  flex items-center  justify-center  md:w-1/3 ">
          <form
            action=""
            className=" flex w-full justify-between rounded-lg dark:bg-bgDarkColor dark:text-[#a9dacb] "
          >
            <input
              className="focus:outline-slate-800 w-3/4 appearance-none rounded-lg  p-2 outline-none focus:outline-2 dark:bg-bgDarkColor dark:text-[#a9dacb] md:w-full "
              type="text"
              placeholder="Buscar"
            />
            <button className="flex ">
              <AiOutlineSearch className="m-2 flex text-2xl hover:cursor-pointer hover:opacity-80 active:opacity-70" />
            </button>
          </form>
        </div>

        {/* right side */}
        <div className="mx-auto gap-2 flex flex-row justify-end md:w-1/3">
          <Link
            href="/"
            className=" flex flex-row items-center  hover:cursor-pointer hover:opacity-80 active:opacity-70"
          >
            <AiOutlineHome className="m-2 text-2xl " />
            <h1 className=" xl:flex hidden">Inicio</h1>
          </Link>

          <Link
            href="/calendar"
            className=" flex flex-row items-center rounded-md hover:cursor-pointer hover:opacity-80 active:opacity-70"
          >
            <AiOutlineCalendar className="m-2 text-2xl " />
            <h1 className=" xl:flex hidden">Calendario</h1>
          </Link>

          <Link
            href="/groupPage"
            className=" flex flex-row items-center rounded-md hover:cursor-pointer hover:opacity-80 active:opacity-70"
          >
            <AiOutlineGroup className="m-2 text-2xl " />
            <h1 className=" xl:flex hidden">Grupos</h1>
          </Link>
          <Link
            href="/profile"
            className=" flex flex-row items-center rounded-md hover:cursor-pointer hover:opacity-80 active:opacity-70"
          >
            <AiOutlineIdcard className="m-2 text-2xl " />
            <h1 className=" xl:flex hidden">Perfil</h1>
          </Link>
        </div>
      </header>
    </>
  );
}
