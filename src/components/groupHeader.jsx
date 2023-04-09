

export default function GroupHeader() {
    return (
        <>
        <div className="">
              {/* group banner */}
              <div className="flex shadow-lg rounded-md overflow-hidden h-40 w-full items-center justify-center bg-[url('/31-minutos-banner.jpg')] bg-cover bg-center">
                <h1 className="flex h-full w-full items-center justify-center text-6xl font-semibold text- drop-shadow-lg backdrop-blur-sm">
                  Group Name
                </h1>
              </div>
              {/* Group options */}
              <div className="flex flex-row bg-white shadow-md p-2 text-black font-semibold justify-evenly rounded-md my-2">
                <button>Inicio</button>
                <button>Calendario</button>
                <button>Miembros</button>
                <button>Invitar</button>
              </div>

            </div>
        </>
    )
}
