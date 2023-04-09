import Image from "next/image";

export default function RecentGroups() {
  return (
    <>
      <div className="m-2 flex flex-col gap-2 ">
        <h1 className="text-lg font-semibold">Grupos recientes</h1>
        <div className="m-2 ml-4 flex flex-col gap-2">
          <div className="rounded-md bg-[url('/31-minutos-banner.jpg')]  bg-cover">
            <div className="flex items-center gap-2  backdrop-blur-sm rounded-md overflow-hidden p-2 ">
              <Image
                src="/31_minutos_logo.svg"
                alt="Icono"
                width={25}
                height={25}
              />
              <h1 className="text-black font-semibold text-lg">31 Minutos</h1>
            </div>
          </div>

          <div className="rounded-md bg-[url('/31-minutos-banner.jpg')]  bg-cover">
            <div className="flex items-center gap-2  backdrop-blur-sm rounded-md overflow-hidden p-2 ">
              <Image
                src="/31_minutos_logo.svg"
                alt="Icono"
                width={25}
                height={25}
              />
              <h1 className="text-black font-semibold text-lg">31 Minutos</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
