export default function PublicationInput() {
  return (
    <>
      <div className=" rounded-md bg-white dark:bg-[#231842] dark:text-[#a9dacb] p-2 shadow-xl">
        <textarea
          type="text"
          className="h-20 w-full dark:bg-[#231842] dark:text-[#a9dacb] resize-none rounded-md p-2"
          placeholder="En que estas pensando?"
        />
        {/* option bar  */}
        <div className="mt-2 flex flex-row items-center  justify-between">
          <button className="rounded-xl dark:bg- dark:text-tex text-white bg-blue-600 p-2 font-semibold hover:bg-blue-800 dark:hover:bg-textDarkColor active:bg-blue-900">
            Agregar Imagenes
          </button>
          <button className="rounded-xl dark:text-textDarkColor text-white bg-green-600 p-2 font-semibold hover:bg-green-800 active:bg-green-900">
            Publicar
          </button>
        </div>
      </div>
    </>
  );
}
