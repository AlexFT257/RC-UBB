import Image from "next/image";


export default function Header() {
    return (
        <>
        <header className="bg-slate-600 shadow-[#1c1b21] shadow-inner  to-[#1c1b21]  flex flex-row p-4 justify-evenly  items-center">
          {/* left side */}
          <div className="flex flex-row gap-2 items-center">
            <Image src="/31_minutos_logo.svg" alt="Icono" width={50} height={50}/>
            <h1>RC UBB</h1>
          </div>
          
          {/* Search bar */}
          <div className="flex flex-row gap-2 ml-auto ">
            <input className="rounded-lg p-2 px-2 appearance-none outline-none focus:outline-2 focus:outline-slate-800" type="text" placeholder="Buscar" />
          </div>

          
          {/* right side */}
          <div className="flex flex-row gap-2 ml-auto mr-2">
            <h1>Inicio</h1>
            <h1>Grupos</h1>
            <h1>Perfil</h1>
            <h1>Salir</h1>
          </div>
          
        </header>
        </>
    )
}

