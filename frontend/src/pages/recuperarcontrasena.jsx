import { useState } from "react";
import Head from "next/head";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

export default function ForgotPassword() {
  const [correo, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  const FORGOT_PASSWORD = gql`
    mutation {
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
    <>
      <Head>
        <title>Recuperar Contraseña</title>
      </Head>
      <h1>Recuperar Contraseña</h1>
      {successMessage ? (
        <p>{successMessage}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Correo:</label>
            <input
              type="email"
              id="correo"
              value={correo}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Recuperar contraseña</button>
        </form>
      )}
      <p>¿Ya tienes cuenta? <a href="/login">Inicia sesión</a></p>
    </>
  );
}
