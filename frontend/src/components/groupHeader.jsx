

export default function GroupHeader() {
    return (
        <>
        <div className="">
              {/* group banner */}
              <div className="flex rounded-md overflow-hidden h-40 w-full items-center justify-center bg-[url('/31-minutos-banner.jpg')] bg-cover bg-center">
                <h1 className="flex h-full w-full items-center justify-center text-6xl font-semibold text-amber-500 drop-shadow-lg backdrop-blur-sm">
                  Group Name
                </h1>
              </div>
              {/* Group options */}
              <div className="flex flex-row bg-slate-700 justify-evenly rounded-md my-2">
                <h1>Inicio</h1>
                <h1>Miembros</h1>
                <h1>Invitar</h1>
              </div>

            </div>
        </>
    )
}
