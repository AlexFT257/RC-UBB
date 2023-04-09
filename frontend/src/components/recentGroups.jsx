import Image from "next/image";

export default function RecentGroups() {
  return (
    <>
      <div className="m-2 flex flex-col gap-2  rounded-md p-2">
        <h1 className="text-lg font-semibold">Grupos recientes</h1>
        <div className="m-2 ml-4 flex flex-col gap-2">
          <button className="rounded-md hover:bg-[#D3D3D3] active:bg-[#C3C3C3] ">
            <div className="flex items-center gap-2   rounded-md overflow-hidden p-2 ">
              <Image
                src="/31_minutos_logo.svg"
                alt="Icono"
                width={25}
                height={25}
              />
              <h1 className="text- font-semibold text-lg">31 Minutos</h1>
            </div>
          </button>

          <button className="rounded-md hover:bg-[#D3D3D3] active:bg-[#C3C3C3]   bg-cover">
            <div className="flex items-center gap-2 rounded-md overflow-hidden p-2 ">
              <Image
                src="/31_minutos_logo.svg"
                alt="Icono"
                width={25}
                height={25}
              />
              <h1 className="text- font-semibold text-lg">31 Minutos</h1>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
