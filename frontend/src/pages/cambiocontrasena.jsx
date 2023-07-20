import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";

const CambioContrasena = () => {
  const [correo, setCorreo] = useState("");
  const [temporalKey, setTemporalKey] = useState("");
  const [nuevaClave, setNuevaClave] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const ACTUALIZAR_CONTRASENA = gql`
    mutation ActualizarContrasena($correo: String!, $temporalKey: String!, $nuevaClave: String!) {
      actualizarContrasena(correo: $correo, temporalKey: $temporalKey, nuevaClave: $nuevaClave)
    }
  `;

  const [actualizarContrasena] = useMutation(ACTUALIZAR_CONTRASENA);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nuevaClave.length < 8) {
      setErrorMessage("La nueva contraseña debe tener al menos 8 caracteres");
      console.error("La nueva contraseña debe tener al menos 8 caracteres");
      return;
    }
  
    // Verificar si la nueva contraseña contiene al menos una letra mayúscula
    if (!/[A-Z]/.test(nuevaClave)) {
      setErrorMessage("La nueva contraseña debe contener al menos una letra mayúscula");
      console.error("La nueva contraseña debe contener al menos una letra mayúscula");
      return;
    }
  
    try {
      const { data } = await actualizarContrasena({
        variables: {
          correo,
          temporalKey,
          nuevaClave
        }
      });
  
      if (data.actualizarContrasena) {
        setSuccessMessage("¡La contraseña se ha actualizado con éxito!");
      }
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Cambio de Contraseña</h1>
      {successMessage && (
        <div className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md mb-4">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md mb-4">
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="correo" className="text-lg">
            Correo:
          </label>
          <input
            type="email"
            id="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="temporalKey" className="text-lg">
            Clave Temporal:
          </label>
          <input
            type="text"
            id="temporalKey"
            value={temporalKey}
            onChange={(e) => setTemporalKey(e.target.value)}
            required
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="nuevaClave" className="text-lg">
            Nueva Contraseña:
          </label>
          <input
            type="password"
            id="nuevaClave"
            value={nuevaClave}
            onChange={(e) => setNuevaClave(e.target.value)}
            required
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Cambiar Contraseña
        </button>
      </form>
      <p>
        ¿Lograste actualizar la contraseña? <a href="/login">Inicia sesión</a>
      </p>
    </div>
  );

};

export default CambioContrasena;
