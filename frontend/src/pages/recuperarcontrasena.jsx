import { useState } from "react";
import Head from "next/head";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

export default function ForgotPassword() {
  const [correo, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  const FORGOT_PASSWORD = gql`
    mutation  {
      forgotPassword(correo: "${correo}") {
        success
      }
    }
  `;

  const [forgotPassword, { error }] = useMutation(FORGOT_PASSWORD);

  const handleSubmit = async (e) => {
    e.preventDefault();

    forgotPassword({ variables: { correo } })
      .then(response => {
        setSuccessMessage("Se ha enviado una clave temporal a tu correo.");
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleLogin = () => {
    // Redirigir al usuario a la página de inicio de sesión
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Head>
        <title>Recuperar Contraseña</title>
      </Head>
      <h1 className="text-3xl font-bold mb-4">Recuperar Contraseña</h1>
      {successMessage ? (
        <p className="text-green-500">{successMessage}</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-lg">
              Correo:
            </label>
            <input
              type="email"
              id="correo"
              value={correo}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Recuperar contraseña
          </button>
        </form>
      )}
      <p>
        ¿Ya recibiste la contraseña temporal?{" "}
        <a href="/cambiocontrasena">Cambia la contraseña</a>
      </p>
      <p>
        ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
      </p>
    </div>
  );
}
