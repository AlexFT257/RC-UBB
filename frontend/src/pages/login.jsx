import { useEffect, useState } from "react";
import Head from 'next/head';
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import withAuth from "../middleware/withAuth";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const GET_TOKEN = gql`
    mutation Login($correo: String!, $contrasena: String!) {
      login(correo: $correo, contrasena: $contrasena) {
        value
      }
    }
  `;

  const [login, { error }] = useMutation(GET_TOKEN);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await login({
        variables: {
          correo: email,
          contrasena: password,
        }
      });

      const token = data.login.value;

      // Guardar el token como cookie
      Cookies.set("token", token, {
        expires: 1,
        secure: true,
        sameSite: "Strict",
        path: "/",
        
      },);
      
      console.log(data, "holahola");

      // Redirigir al usuario a otra página
      //router.push("/dashboard"); // Cambiar "/dashboard" por la ruta deseada
     // Redirigir al usuario a la página de editar usuario
     router.push("/EditarUsuario");
    } catch (error) {
      console.log(error);
    }
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
    <div className="flex flex-col items-center justify-center h-screen">
      <Head>
        <title>Login</title>
      </Head>
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="text-lg">
            Correo:
          </label>
          <br />
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-lg">
            Contraseña:
          </label>
          <br />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Iniciar sesión
        </button>
      </form>
      <div className="space-x-2 mt-4">
        <button
          onClick={handleForgotPassword}
          className="text-blue-500 hover:text-blue-700"
        >
          Recuperar contraseña
        </button>
        <button
          onClick={handleCreateAccount}
          className="text-blue-500 hover:text-blue-700"
        >
          Crear cuenta
        </button>
      </div>
    </div>
  );
};
export default withAuth(Login);