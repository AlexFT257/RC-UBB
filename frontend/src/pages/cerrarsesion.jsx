import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import withAuth from "../middleware/withAuth";

const CerrarSesion = () => {
  const client = useApolloClient();
  const router = useRouter();

  const handleCerrarSesion = () => {
    // Eliminar la cookie de autenticación
    Cookies.remove("token");

    // Limpiar la caché de Apollo Client para eliminar los datos de la sesión
    client.clearStore();

    // Redireccionar a la página de inicio de sesión u otra página deseada
    router.push("/login");
  };

  return <button onClick={handleCerrarSesion}>Cerrar sesión</button>;
};

export default withAuth(CerrarSesion);
