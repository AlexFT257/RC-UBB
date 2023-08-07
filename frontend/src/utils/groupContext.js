import { createContext, useState, useEffect, useContext } from "react";

export const GroupContext = createContext();
import { clientMutator, clientRequester } from "./graphqlManager.js";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import {UserContext} from "./userContext.js";

const GET_GROUP_INFO = gql`
  query buscarGrupoId($id: ID!) {
    buscarGrupoId(id: $id) {
      id
      nombre
      icono
      banner
      admins {
        id
        nombre
        apellido
        username
        foto_perfil
      }
      miembros {
        id
        nombre
        apellido
        username
        foto_perfil
      }
      solicitudes {
        id
        nombre
        apellido
        username
        foto_perfil
      }
    }
  }
`;

export const GroupProvider = (props) => {

  const {user} = useContext(UserContext);
  const [group, setGroup] = useState();
  const [groupPost, setGroupPost] = useState([]);

  const router = useRouter();
  const { groupId } = router.query;

  useEffect(() => {
    if (!group) {
      requestGroup().then((data) => {
        setGroup(data);
      });
    }
  }, [groupId, group]);
  
  const updateGroupContext = () => {
    requestGroup().then((data) => {
      setGroup(data);
    });
  };

  const requestGroup = async () => {
    const { buscarGrupoId } = await clientRequester(
      `query buscarGrupoId($id: ID!) {
        buscarGrupoId(id: $id) {
            id
            nombre
            icono
            banner
            descripcion
            admins {
                id
                nombre
                apellido
                username
                foto_perfil
            }
            miembros {
                id
                nombre
                apellido
                username
                foto_perfil
            }
            solicitudes {
                id
                nombre
                apellido
                username
                foto_perfil
            }
        }
    }`,
      { id: groupId },
      false
    ).then((data) => {
      return data;
    });

    console.log("request", buscarGrupoId);
    return buscarGrupoId;
  };



  return (
    <GroupContext.Provider
      value={{
        group,
        setGroup,
        requestGroup,
        updateGroupContext
      }}
    >
      {props.children}
    </GroupContext.Provider>
  );
};
