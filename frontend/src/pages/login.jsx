import { useEffect, useState } from "react";
import Head from 'next/head';
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const GET_TOKEN = gql`
  
  mutation {
    login(correo:"${email}", contrasena:"${password}"){
      value
    }
  }`
  // const [login, { data, loading, error, reset }] = useMutation(GET_TOKEN)
  //const data = await response.json();
  const [login, { error, reset }] = useMutation(GET_TOKEN)
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(login, "hola")
    login({ variables: { email, password } }).then(response => {
      console.log(response.data, "holahola")
    }).catch(error => { console.log(error) })
  };
  const handleForgotPassword = () => {
    // Redirigir al usuario a la página de recuperar contraseña
    router.push("/recuperarcontrasena");
  };

  const handleCreateAccount = () => {
    // Redirigir al usuario a la página de crear cuenta
    router.push("/crearusuario");
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <h1>Login</h1>
      <>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Correo:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Iniciar sesión</button>
        </form>
        <div>
          <button onClick={handleForgotPassword}>Recuperar contraseña</button>
        </div>
        <div>
          <button onClick={handleCreateAccount}>Crear cuenta</button>
        </div>
      </>
    </>
  );
}