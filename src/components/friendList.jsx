
export default function FriendList() {
    return (
        <>
        <div className=" text-black rounded-md ">
              <ul>
                <li className="m-2 flex cursor-pointer flex-row items-center gap-2 hover:opacity-80 active:opacity-60">
                  <div className="h-2 w-2 rounded-full bg-green-400"></div>
                  <h1 className="text-lg font-semibold">Juan Carlos Bodoque</h1>
                </li>

                <li className="m-2 flex cursor-pointer flex-row items-center gap-2 hover:opacity-80 active:opacity-60">
                  <div className="h-2 w-2 rounded-full bg-green-400"></div>
                  <h1 className="text-lg font-semibold">Juanin Juan Harry</h1>
                </li>
              </ul>

              <li className="m-2 flex cursor-pointer flex-row items-center gap-2 hover:opacity-80 active:opacity-60">
                <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                <h1 className="text-lg font-semibold">Tulio Triviño</h1>
              </li>
            </div>
        </>
    )
}
