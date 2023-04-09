import { useState } from 'react';
import * as nsfwjs from 'nsfwjs';

export default function PublicationInput() {
  const [image, setImage] = useState(null);
  const [isExplicit, setIsExplicit] = useState(false);

  const handleImageChange = async (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);

    // Vista previa de la imagen seleccionada
    const reader = new FileReader();
    reader.onload = () => {
      const imgPreview = document.getElementById("image-preview");
      imgPreview.src = reader.result;
    };
    reader.readAsDataURL(selectedImage);

    // Evaluar si la imagen es explícita o no
    const model = await nsfwjs.load();
    const imageElement = document.getElementById('image-preview');
    const predictions = await model.classify(imageElement);
    setIsExplicit(predictions[0].className === 'Porn' || predictions[0].className === 'Hentai');
    console.log('Predictions: ', predictions) // 
  };

  return (
    <>
      <div className="m-2 rounded-md bg-slate-600 p-2">
        <textarea
          type="text"
          className="h-20 w-full resize-none rounded-md p-2"
          placeholder="En que estas pensando?"
        />
        {/* option bar */}
        <div className="mt-2 flex flex-row items-center justify-between">
          <label htmlFor="image-upload" className="rounded-xl bg-blue-700 p-2 font-semibold hover:bg-blue-800 active:bg-blue-900 cursor-pointer">
            Agregar Imagenes
          </label>
          <input id="image-upload" type="file" onChange={handleImageChange} className="hidden" accept="image/*" />
          <button className="rounded-xl bg-green-700 p-2 font-semibold hover:bg-green-800 active:bg-green-900">
            Publicar
          </button>
        </div>
        {/* Vista previa de la imagen seleccionada */}
        {image && (
          <div className="mt-2">
            <img id="image-preview" src="" alt="Vista previa de la imagen seleccionada" className="mt-2 rounded-md" style={{ maxWidth: "100%", maxHeight: "200px" }} />
            {isExplicit ? (
              <h1 className="text-red-600 mt-2">Esta imagen podría contener contenido explícito.</h1>
            ) : (
              <h1 className="text-green-600 mt-2">Esta imagen no parece contener contenido explícito.</h1>
            )}
          </div>
        )}
      </div>
    </>
  );
}