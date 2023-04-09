export default function PublicationInput() {
  return (
    <>
      <div className=" rounded-md bg-white p-2 shadow-xl">
        <textarea
          type="text"
          className="h-20 w-full resize-none rounded-md p-2"
          placeholder="En que estas pensando?"
        />
        {/* option bar  */}
        <div className="mt-2 flex flex-row items-center  justify-between">
          <button className="rounded-xl text-white bg-blue-600 p-2 font-semibold hover:bg-blue-800 active:bg-blue-900">
            Agregar Imagenes
          </button>
          <button className="rounded-xl text-white bg-green-600 p-2 font-semibold hover:bg-green-800 active:bg-green-900">
            Publicar
          </button>
        </div>
      </div>
    </>
  );
}
