import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const withAuth = (WrappedComponent) => {
  const Auth = (props) => {
    const router = useRouter();

    useEffect(() => {
      // Verificar si el token está presente en las cookies
      const token = Cookies.get("token");

      if (!token) {
        // Si no hay token, redirigir al usuario a la página de login
        router.push("/login");
      }else {
        // Si hay token, redirigir al usuario a la página deseada (por ejemplo, editar usuario)
        router.push("/EditarUsuario");
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return Auth;
};

export default withAuth;
