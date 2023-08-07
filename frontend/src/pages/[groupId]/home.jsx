import React, { use, useEffect } from "react";
import GroupHeader from "../../components/groupHeader";
import { useContext,useState } from "react";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import Home from "@/components/home";
import Post from "@/components/post";
import { UserContext } from "@/utils/userContext";
import PostPublishGroup from "@/components/PostPublishGroup";
import { GroupContext } from "@/utils/groupContext";

export default function GroupHome() {
  const { user,removePost,addComment,likePost } = useContext(UserContext);
  const { group, updateGroupContext, requestGroupPost, addGroupPost} = useContext(GroupContext);
  const [posts, setPosts] = useState([]);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    if (group) {
      requestGroupPost(group.id, skip).then((res) => {
        setPosts(res);
      });
    }
  }, [group, skip]);

  // cada vez que se llega al final de la pagina se recargan
  // los posts del grupo
  useEffect(() => {
    let scrolling = false;

    function handleScroll() {
      if (!scrolling) {
        scrolling = true;

        setTimeout(() => {
          // Calcular la posición del usuario en relación al final de la página
          const scrollPosition = window.innerHeight + window.scrollY;
          const documentHeight = document.body.offsetHeight;
          const distanceToBottom = documentHeight - scrollPosition;

          // Definir un umbral para considerar que el usuario llegó al final
          const threshold = 100; // Puedes ajustar este valor

          if (distanceToBottom < threshold) {
            console.log('Usuario llegó al final de la página');
            // Aquí puedes realizar acciones adicionales, como cargar más contenido.
            if (group) {
              if (posts.length > 0) {
                setSkip(posts.length+skip);
              }
              requestGroupPost(group.id, skip).then((res) => {
                setPosts(res);
              });
            }
          }

          scrolling = false;
        }, 2000); // Cambia este valor según tus necesidades
      }
    }

    // Agregar el evento de desplazamiento al montar el componente
    window.addEventListener('scroll', handleScroll);

    // Eliminar el evento cuando el componente se desmonte
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  

  // useEffect que hace fetch de los posts del grupo
  // periodicamente cada 60 segundos
  // useEffect(() => {
  //   const interval = setInterval(() => {
      
  //   }, 60000);
  //   return () => clearInterval(interval);
  // }, [group, skip]);


  // console.log("user", user);
  // console.log("GroupHome", group);
  // obtener el id del grupo desde la url
  const router = useRouter();
  const { groupId } = router.query;
  // console.log("groupId", groupId);

  useEffect(() => {
    if (!group) {
      updateGroupContext();
    }
    if (group && group.id !== groupId) {
      updateGroupContext();
    }
  }, [group, groupId]);

  const isAdmin = () => {
    if (group?.admins?.some((admin) => admin.id === user.id)) {
      return true;
    } else {
      return false;
    }
  };

  // console.log("isAdmin?", isAdmin());

  return (
    <>
      <div className="z-10 mt-[80px]  w-[100vw] max-w-[100vw] text-current lg:w-[55vw] lg:max-w-[90vw] lg:px-10">
        <div className="mt-4 flex-col items-center  justify-between text-[5vw] font-bold sm:text-[18px] ">
          <GroupHeader
            GroupName={group?.nombre}
            GroupId={groupId}
            isAdmin={isAdmin()}
            GroupBanner={group?.banner}
          />
          {/* Input para publicar */}
          <PostPublishGroup user={user} addPost={addGroupPost} enGrupo={groupId}/>

          {/* Publicaciones container */}
          <div className="">
            {posts?.map((post) => (
              <Post
                key={post.id}
                post={post}
                usuario={user.id}
                removePost={removePost}
                addComment={addComment}
                likePost={likePost}
              />
            ))}

          </div>
        </div>
      </div>
    </>
  );
}

GroupHome.getLayout = function getLayout(page, screenWidth) {
  return <Home screenWidth={screenWidth}>{page}</Home>;
};
