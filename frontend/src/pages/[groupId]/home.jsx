import React, { useEffect } from "react";
import GroupHeader from "../../components/groupHeader";
import { useContext } from "react";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import Home from "@/components/home";
import { UserContext } from "@/utils/userContext";
import PostPublish from "@/components/PostPublish";
import { GroupContext } from "@/utils/groupContext";

export default function GroupHome() {
  const { user } = useContext(UserContext);
  const { group,updateGroupContext } = useContext(GroupContext);

  // console.log("user", user);
  // console.log("GroupHome", group);
  // obtener el id del grupo desde la url
  const router = useRouter();
  const { groupId } = router.query;
  // console.log("groupId", groupId);

  useEffect(() => {
    if(!group){
      updateGroupContext();
    }
  }, [group]);

  const isAdmin = () => {
    if (
      group?.admins?.some(
        (admin) => admin.id === user.id
      )
    ) {
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
            <PostPublish user={user} />

            {/* Publicaciones container */}
            <div className=""></div>
        </div>
      </div>
    </>
  );
}

GroupHome.getLayout = function getLayout(page, screenWidth) {
  return <Home screenWidth={screenWidth}>{page}</Home>;
};
