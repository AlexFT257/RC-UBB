import Profile from "@/pages/profile";
import Image from "next/image";
import Link from "next/link";


export default function Header() {
    return (
        <>
        {/*  gradient-to-t from-[#E2E2E2]  to-[#B2B2B2] */}
        <header className="bg-white text-black font-semibold shadow-xl mb-2   flex flex-row p-4 justify-evenly  items-center">
          {/* left side */}
          <div className="flex-row gap-2 hidden md:flex items-center">
            <Image src="/31_minutos_logo.svg" alt="Icono" width={50} height={50}/>
            <h1>RC UBB</h1>
          </div>
          
          {/* Search bar */}
          <div className="flex flex-row gap-2 ml-auto ">
            <input className="rounded-lg p-2 w-3/4 md:w-full appearance-none outline-none focus:outline-2 focus:outline-slate-800" type="text" placeholder="Buscar" />
          </div>

          
          {/* right side */}
          <div className="flex flex-row  gap-2 ml-auto mr-2">
            <Link href="/" className="rounded-md m-2">Inicio</Link>
            <Link href="/groupPage" className="rounded-md m-2">Grupos</Link>
            <Link href="/profile" className="rounded-md m-2">Perfil</Link>
            <h1 className="m-2">Salir</h1>
            
          </div>
          
        </header>
        </>
    )
}

