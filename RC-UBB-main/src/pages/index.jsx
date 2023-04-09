import {
  AiFillHeart, AiOutlineComment, AiOutlineHome, AiOutlineUser, AiOutlineSetting,
  AiOutlineSend, AiOutlineCalendar, AiOutlineApartment, AiOutlineMenu, AiOutlineSearch, AiOutlineBell, AiOutlinePicture
} from "react-icons/ai";

import React, { useState, useEffect } from 'react';
import { socketID, socket } from "@/socketManager";


const dBUsers = [{
  id: 0,
  username: "johndoe",
  profilePicture: "https://picsum.photos/50",
  email: "johndoe@example.com",
  chats: [0]
},
{
  id: 1,
  username: "janedoe",
  profilePicture: "https://picsum.photos/51",
  email: "janedoe@example.com",
  chats: [0]
},
];


const dBPosts = [
  {
    id: 1,
    userID: 1,
    content: "Check out my new blog post on React!",
    media: ["/Img1.jpg", "/Img2.jpg", "/Img3.jpg", "/Img4.jpg"],
    comments: [
      {
        id: 0,
        userID: 1,
        content: "Amazing!",
        media: [],
        likes: [1, 0],
        timestamp: new Date(2023, 3, 6, 3, 10, 0, 0)
      },

    ],
    likes: [1, 0],
    timestamp: new Date(2023, 3, 6, 10, 10, 0, 0),
  },
  {
    id: 2,
    userID: 0,
    content: "Just finished building my first React app!",
    media: ["/Img1.jpg"],
    comments: [],
    likes: [1, 0],
    timestamp: new Date(2023, 3, 6, 9, 5, 0, 0),
  },
  {
    id: 3,
    userID: 1,
    content: "Just finished building my first React app!",
    media: ["/Img1.jpg", "/Img2.jpg", "/Img3.jpg"],
    comments: [],
    likes: [1, 0],
    timestamp: new Date(2023, 3, 6, 9, 5, 0, 0),
  },
  {
    id: 4,
    userID: 1,
    content: "Just finished building my first React app!",
    media: [],
    comments: [],
    likes: [1, 0],
    timestamp: new Date(2023, 3, 6, 9, 5, 0, 0),
  },
];

const dBChats = [
  {
    id: 0,
    users: [0, 1],
    log: [{timestamp: new Date(), userID: 0, content: "hola" , media : []}, { timestamp: new Date(), userID: 1, content: "Como estas", media : [] }]
  }
]

const getCookieVal = (val) => {
  console.log("COKKIES " + document.cookie)
  const cookies = document.cookie.split('; ');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split('=');
    if (cookie[0] === val) {
      return parseInt(cookie[1]);
    }
  }
  return -1;
}

export default function Home() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(dBUsers) //NO HAY, SOLO HAY AMIGOS Y LOS POSTS TIENEN POPULATE DE USERNAME Y PROFILE PICTURE 
  const [friends, setFriends] = useState(dBUsers) //NO HAY, SOLO HAY AMIGOS Y LOS POSTS TIENEN POPULATE DE USERNAME Y PROFILE PICTURE 

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);

  const [postsData, setPostsData] = useState(dBPosts)
  const [userChats, setUserChats] = useState([])

  const actPage = 0;

  useEffect(() => {

    if (socket === undefined) { return; }
    let userID = -1;
    const randomUser = Math.round(Math.random() * 10000) //PUT INCRIPTED COOKIE

    if ((userID = getCookieVal('user')) === -1) {//NO PASA SOLO DE PRUEBA
      document.cookie = "user=" + randomUser.toString() + "; expires=Thu, 01 Jan 2024 00:00:00 UTC; path=/"; //GUARDAR COOKIE EN BASE DE DATOS
      /* document.cookie = "name=newValue";
      document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"; */
      userID = randomUser;

      const nUser = {
        id: randomUser,
        username: "johndoe" + randomUser,
        profilePicture: "https://picsum.photos/50",
        email: randomUser + "@example.com",
        chats: []
      }

      socket.emit('user info', { content: nUser }); //MANDAR INFO DE USUARIO CUANDO LOGUEA LA COOKIE PARA DESENCRIPTARLA EN EL SERVER Y GUARDARLA EN EL SOCKET

      console.log("user created ", nUser, " allus ", users);
      setUsers([...users, nUser]);


    } else {

      if (users.findIndex((x) => x.id === userID) === -1) { //NO PASA SOLO DE PRUEBA
        const nUser = {
          id: userID,
          username: "johndoe" + userID,
          profilePicture: "https://picsum.photos/50",
          email: userID + "@example.com",
          chats: []
        }
        socket.emit('user info', { content: nUser }); //MANDAR INFO DE USUARIO CUANDO LOGUEA LA COOKIE PARA DESENCRIPTARLA EN EL SERVER Y GUARDARLA EN EL SOCKET

        setUsers([...users, nUser]);
      }
    }



  }, [socket]);

  useEffect(() => { //LAMAAR BASE DE DATOS
    let userID = -1;
    let userIndex = -1;
    if ((userID = getCookieVal('user')) !== -1 && (userIndex = users.findIndex((x) => x.id === userID)) !== -1) {
      setUser(users[userIndex]);
    }

  }, [users]);


  useEffect(() => {
    if (user !== null) {

      let nChats = []
      user.chats.forEach((val) => {
        nChats.push({...dBChats[val], active : false});
      })
      setUserChats(nChats);

    }

  }, [user]);

  socket.on('new user', (msg) => { //NO EXISTE CAMBIAR POR NEW FRIEND O ALGO ASI
    if(friends.findIndex((x)=> x.id === msg.id) === -1){
      setFriends([...friends, msg]);
    }
  });

  socket.on('chat message', (msg, callback) => {
    processMsg(msg, msg.userID);
    callback('recived')
    console.log("reciving", msg, "all cahts", userChats)
  });

  const sendMessage = (newMsg) => {
    socket.emit('chat message', newMsg, (response) => {
      console.log("STATE: ", newMsg, response)
      if (response === 'sended') {

      } else if (response === 'recived') {

      }
    });
    processMsg(newMsg, newMsg.toUser)
  }

  const processMsg = (msg, destinatary) => {
    if (user !== null) {
      let chatID = 0;
      if ((chatID = userChats.findIndex((x) => x.users.findIndex((y) => y === destinatary) > -1)) > -1) {

        console.log("founded chat")
        const nChats = userChats.map((val) => {
          if (chatID === val.id) {
            return { ...val, log: [...val.log, { userID: msg.userID, content: msg.content }], active : true }
          } else {
            return val;
          }
        })
        setUserChats(nChats);
      } else {

        console.log("adding chat", {
          id: userChats.length,
          users: [user.id, destinatary],
          log: [{ userID: msg.userID, content: msg.content }]
        })


        setUserChats([...userChats, {
          id: userChats.length,
          users: [user.id, destinatary],
          log: [{ userID: msg.userID, content: msg.content }],
          active : true
        }]);/* 

        if(msg.userID !== user.id){
          openChat(destinatary)
        } */
      }
    }
  }

  const openChat = (userID) => {
    let chatID = -1;
    if ((chatID = userChats.findIndex((x) => x.users.findIndex((y) => y === userID) > -1)) > -1) {
      const nChats = userChats.map((val) => {
        if (chatID === val.id) {
          return { ...val, active : true }
        } else {
          return val;
        }
      })

      setUserChats(nChats)
    } else {
      setUserChats([...userChats, {
        id: userChats.length,
        users: [user.id, userID],
        log: [],
        active : true
      }])
    }
  }

  const closeChat = (chatID) => { 
    let nChats = userChats.map((val) => {
      if (chatID === val.id) {
        return { ...val, active : false }
      } else {
        return val;
      }
    })
    setUserChats(nChats)
  }



  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isHeaderVisible = prevScrollPos > currentScrollPos || currentScrollPos < 20;

      setPrevScrollPos(currentScrollPos);
      setHeaderVisible(isHeaderVisible);

    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  const handleLike = (postId, usId) => { //RETURN FROM DATABASE RATHER

    const newData = postsData.map(post => {
      if (post.id === postId) {
        if (post.likes.indexOf(usId) < 0) {
          const likes = [...post.likes, usId];
          return { ...post, likes }
        } else {
          const likes = post.likes.filter(obj => obj !== usId);
          return { ...post, likes }
        }

      } else {
        return post
      }
    })
    setPostsData(newData)
  }

  const handlePostPublish = (post) => {
    const newPost = { ...post, id: postsData.length + 1 }

    setPostsData([...postsData, newPost].sort((a, b) => {
      if (a.timestamp > b.timestamp) {
        return -1;
      } else if (a.timestamp < b.timestamp) {
        return 1;
      } else {
        // if the dates are the same, sort by the order in which the items were added
        return a.id - b.id;
      }
    }));

  }



  const actButtonStyle = (idx) => {
    if (idx == actPage) {
      return {
        style: { color: 'var(--text-color)', borderLeft: '4px solid var(--text-color)' },
        onMouseEnter: (e) => { e.target.style.color = 'var(--accent-color)' },
        onMouseLeave: (e) => { e.target.style.color = 'var(--text-color)' }
      };
    } else {
      return ({})
    }
  }

  return (<>

    <div className="backCol"></div>
    {user === null ? <></> :
      <div className="container">

        <Header headerVisible={headerVisible} />

        <div className={`wrapper-left ${headerVisible ? 'wrapper--visible' : 'wrapper--hidden'}`}>

          <div className="user-profile">
            <img src={user.profilePicture} alt={`${user.username}'s profile picture`} />

            <div className="user-profile__info">
              <h2 className="user-profile__name">{user.username}</h2>
              <p className="user-profile__email">{user.email}</p>
            </div>
            <AiOutlineMenu style={{ width: '1.5rem', height: '1.5rem' }} />

          </div>

          <div className="navigator">
            <button {...actButtonStyle(0)}> <AiOutlineHome /> Feed </button>
            <button {...actButtonStyle(1)}> <AiOutlineUser /> Friends </button>
            <button {...actButtonStyle(2)}> <AiOutlineCalendar /> Events </button>
            <button {...actButtonStyle(3)}> <AiOutlineApartment /> Comunities </button>
            <button {...actButtonStyle(4)}> <AiOutlineSetting /> Settings </button>
          </div>
        </div>

        <div className="feed">
          <PublishPost addPost={handlePostPublish} us={user} />
          {postsData.map((post) => (
            <PostWithComments post={post} key={post.id} handleLike={handleLike} uss={users} us={user} />
          ))}

        </div>
        <div className={`wrapper-right ${headerVisible ? 'wrapper--visible' : 'wrapper--hidden'}`}>
          <CalendarList events={[{ name: "Party", date: "10/1" }, { name: "Party", date: "10/11" }, { name: "Party", date: "10/12" }, { name: "Party", date: "10/13" }]} />

          <FriendsList friends={friends} newChat={openChat} />
        </div>
        {userChats.map((cha, index) => (
          cha.active && <Chat key={cha.id} chatInfo={cha} sendMessage={sendMessage} us={user} closeChat={()=> closeChat(index)} style = {{right : "calc("+index +"*300px)" }} />
        ))
        }
      </div>
    }

  </>
  );
}

function Header({ headerVisible }) {

  return (
    <header className={`header ${headerVisible ? 'header--visible' : 'header--hidden'}`}>
      <div className="header__left">
        <img className="header__logo" src="/LogoUchat.png" alt="Your Logo" />
        {/* <img className="mask" /></div> */}
      </div>
      <div className="header__center">
        <form className="header__search-form" action="#">
          <input className="header__search-input" type="text" placeholder="Search" />
          <button className="header__search-button" type="submit">
            <AiOutlineSearch style={{ width: '1.5rem', height: '1.5rem' }} />
          </button>
        </form>
      </div>
      <div className="header__right">
        <button className="header__notifications">
          <AiOutlineComment />
          {true ? <></> : <div className="circle"></div>}
        </button>
        <button className="header__notifications">
          <AiOutlineBell />
          {false ? <></> : <div className="circle"></div>}
        </button>
      </div>
    </header>
  );
}

const PublishPost = ({ addPost, us }) => {

  const [newPost, setNewPost] = useState({
    id: 0,
    userID: us.id,
    content: '',
    media: [],
    likes: [],
    comments: [],
    timestamp: new Date(),
  });

  const handlePostSubmit = (event) => {

    event.preventDefault();
    if (newPost.content != "") {
      addPost(newPost)

      setNewPost({
        id: 0,
        userID: us.id,
        content: '',
        media: [],
        likes: [],
        comments: [],
        timestamp: new Date(),
      });

    }

  };

  const handlePostChange = (event) => {
    setNewPost({ ...newPost, content: event.target.value, timestamp: new Date() });
  };
  return (
    <div className="publish-post-container">


      <form className="comment-form" onSubmit={handlePostSubmit}>
        <button className="comment-form-left">
          <AiOutlinePicture />
        </button>

        <input className="comment-form__input"
          type="text"
          placeholder="Say something!..."
          value={newPost.content}
          onChange={handlePostChange}
        />
        <button className="comment-form-right" type="submit"><AiOutlineSend /></button>
      </form>
    </div>
  );
};

function PostWithComments({ post, handleLike, uss, us }) {
  const date = new Date();

  const checkTimeStamp = (time) => {
    const secsAgo = (date - time) / 1000;
    if (secsAgo < 60) { //min
      return "Hace " + Math.round(secsAgo) + " segundos";
    } else if (secsAgo < 3600) {//hora
      return "Hace " + Math.round(secsAgo / 60) + " minutos";
    } else if (secsAgo < 86400) {//dia
      return "Hace " + Math.round(secsAgo / 3600) + " horas";
    } else if (secsAgo < 2592000) {//mes
      return "Hace " + Math.round(secsAgo / 86400) + " dias";
    } else {
      return "Hace" + Math.round(secsAgo / 2592000) + " meses";
    }
  }

  const [comments, setComments] = useState(post.comments);
  const [newComment, setNewComment] = useState({
    id: 0,
    userID: us.id,
    content: '',
    likes: [],
    timestamp: new Date(),
  });

  const handleCommentLike = (commentId, usId) => { //RETURN FROM DATABASE RATHER
    const newData = comments.map(comment => {

      if (comment.id === commentId) {
        if (comment.likes.indexOf(usId) < 0) {
          const likes = [...comment.likes, usId];
          return { ...comment, likes }
        } else {
          const likes = comment.likes.filter(obj => obj !== usId);
          return { ...comment, likes }
        }

      } else {
        return comment
      }
    })
    setComments(newData)
  }

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (newComment.content != "") {

      setComments([...comments, newComment]);
      setNewComment({ //MAL DEBERIA APUNTAR SOLO A LA ID DEL USER
        id: 0,
        userID: us.id,
        content: '',
        media: [],
        likes: [],
        timestamp: new Date(),
      });
    }
  };

  const handleCommentChange = (event) => {
    setNewComment({ ...newComment, id: comments.length, content: event.target.value, timestamp: new Date() });
  };

  const OptionsMenu = () => {

    const [showOptionMenu, setShowOptionMenu] = useState(false);

    const handleOptionsButtonClick = () => {
      setShowOptionMenu(!showOptionMenu);
    }
    return (
      <div className="post__options" onBlur={() => { setShowOptionMenu(false); }} >
        <button className="post__comment-likes" onClick={() => handleOptionsButtonClick()}>
          <AiOutlineMenu style={{ width: '1.5rem', height: '1.5rem' }} />
        </button>
        {showOptionMenu && (
          <div className="post__options-list" >
            <ul>
              <li>Delete</li>
              <li>Report</li>
            </ul>
          </div>
        )}
      </div>
    )
  }


  return (
    <div className="post">
      <div className="post__header">
        <img
          className="post__profile-picture"
          src={uss[post.userID].profilePicture}
          alt={`${uss[post.userID].username}'s profile picture`}
        />
        <div className="post__info">
          <h2 className="post__username">{uss[post.userID].username.charAt(0).toUpperCase() + uss[post.userID].username.slice(1)}</h2>
          <p className="post__timestamp">{checkTimeStamp(post.timestamp)}</p>
        </div>

        <OptionsMenu />

      </div>



      <div className="post__content">
        {post.content}
        {post.media.length > 0 &&
          <div className="post__media"> {Images({ images: post.media })} </div>}
      </div>




      <div className="post__footer">
        <button className="post__likes" onClick={() => { handleLike(post.id, us.id); }}>
          <AiFillHeart style={{ color: post.likes.indexOf(us.id) >= 0 ? 'var(--primary-color)' : 'inherit' }} />
          <span>{post.likes.length}</span>
        </button>
        <div className="post__comments">
          <AiOutlineComment />
          <span>{comments.length}</span>
        </div>
      </div>




      <div className="post__comment-section">
        {comments.length > 0 && (
          <div className="post__comments-list">

            {comments.length > 3 && (
              <button
                className="post__view-more-comments"
                onClick={() => alert('View more comments...')}>
                View more comments...
              </button>
            )}

            {comments.slice(Math.max(0, comments.length - 3), comments.length).map((comment, index) => (

              <div key={index} className="post__header" style={{ borderTop: "1px solid var(--bg-color)", borderRadius: '10px', paddingTop: '10px' }}>
                <img
                  className="post__comment-picture"
                  src={uss[comment.userID].profilePicture}
                  alt={`${uss[comment.userID].username}'s profile picture`}
                />

                <div className="post__comment">
                  <div className="post__info">
                    <h2 className="post__username">{uss[comment.userID].username.charAt(0).toUpperCase() + uss[comment.userID].username.slice(1)}</h2>
                    <h2 className="post__content">{comment.content}</h2>
                  </div>

                  <p className="post__timestamp">{checkTimeStamp(comment.timestamp)}</p>
                </div>

                <div className="post__comment-right" >
                  <button className="post__comment-likes" onClick={() => handleCommentLike(comment.id, us.id)}>
                    <AiFillHeart style={{ color: comment.likes.indexOf(us.id) >= 0 ? 'var(--primary-color)' : 'inherit' }} />
                    <span>{comment.likes.length}</span>
                  </button>

                  <OptionsMenu />
                </div>
              </div>

            ))}
          </div>
        )}


        <form className="comment-form" onSubmit={handleCommentSubmit}>

          <button className="comment-form-left">
            <AiOutlinePicture />
          </button>
          <input className="comment-form__input"
            type="text"
            placeholder="Add a comment"
            value={newComment.content}
            onChange={handleCommentChange}
          />
          <button className="comment-form-right" type="submit"><AiOutlineSend /></button>
        </form>


      </div>
    </div>
  );
}

const Images = ({ images }) => {

  return images.map((image, index) => {
    if (images.length !== 3) {
      return <div key={index} className={images.length === 1 ? "post__image-container-big" : (images.length === 2 ? "post__image-container-medium" : "post__image-container-small")}
        style={{ marginBottom: '20px', marginLeft: index % 2 !== 0 ? '20px' : 0 }} >
        <img key={index} src={image} />
      </div>

    } else {
      if (index === 0) {
        return <div key={index} className="post__image-container-medium"
          style={{ marginBottom: '20px', marginRight: '20px' }} >
          <img key={index} src={image} />
        </div>
      } else {
        if (index === 2) {
          return <div key={index} />
        } else {
          return <div key={index} className="post__image-container-medium" >
            <div className="post__image-container-small" style={{ marginBottom: '20px', maxWidth: '100%', width: '100%' }}><img key={index} src={image} /></div>
            <div className="post__image-container-small" style={{ marginBottom: '20px', maxWidth: '100%', width: '100%' }}><img key={index} src={images[index + 1]} /></div>
          </div>
        }


      }
    }
  });


};



const FriendsList = ({ friends, newChat }) => {
  return (
    <>
      <h2 className="section-title"> FRIENDS
        <div className="section-counter">
          1/2
        </div>
      </h2>
      <div className="list-container" style={{ height: '400px' }}>
        {friends.map((friend, index) => (
          <button key={index} className="list-item" onClick={() => newChat(friend.id)}>

            <img src={friend.profilePicture} alt={`${friend.username}'s profile`} />
            <h2 className="friend-list-username">{friend.username.charAt(0).toUpperCase() + friend.username.slice(1)}</h2>
            <div className="post__comment-right"> <AiOutlineComment style={{ width: '1.5rem', height: '1.5rem', color: index === 1 ? 'var(--primary-color)' : "inherit" }} /></div>

          </button>
        ))}
      </div>
    </>
  );
};

const CalendarList = ({ events }) => {
  return (
    <>
      <h2 className="section-title">UPCOMING EVENTS </h2>
      <div className="list-container">
        {events.map((event, index) => (
          <button key={index} className="list-item">
            <div className="list-item-date">
              <AiOutlineCalendar className="calendar-logo" alt={'calendar profile'} />
              {event.date}</div>
            <div className="list-item-details">
              <div className="list-item-name">{event.name}</div>
              <div className="list-item-description">Short description of the event and waht about dadawd awd awd aw.</div>
            </div>
          </button>
        ))}
      </div>
    </>
  );
};


const Chat = ({ chatInfo, sendMessage, us, closeChat, style }) => {
  console.log("rendering ", chatInfo);
  const [minimized, setMinimized] = useState(false);
  const [newMsg, setNewMsg] = useState({ userID: us.id, content: '', toUser: chatInfo.users.find((x) => x !== us.id) })

  const processMessage = () => {
    if (newMsg.content !== '') {
      sendMessage(newMsg)
      setNewMsg({ userID: us.id, content: '', toUser: chatInfo.users.find((x) => x !== us.id) })
    }

  }
  const changeMessage = (event) => {
    setNewMsg({ ...newMsg, content: event.target.value, toUser: chatInfo.users.find((x) => x !== us.id)  });
  }

  const toggleMinimized = () => {
    setMinimized(!minimized);
  };

  const handleCloseChat = () => {
    closeChat();
    setMinimized(true)
  };

  return (
    <div className={`chat ${minimized ? 'minimized' : ''}`} style={style}>
      {/* chat header */}
      <div className="chat-header">
        <h2>Chat</h2>
        <button onClick={toggleMinimized}>Minimize</button>
        <button onClick={handleCloseChat}>Close</button>
      </div>
      {/* chat messages */}
      <div className="chat-messages">
        {chatInfo.log.map((msg, index) => (
          <div key={index}>
            <h1>{msg.userID + ": " + msg.content}</h1>
          </div>
        ))}
      </div>
      {/* chat input */}
      <div className="chat-input">
        <input type="text" value={newMsg.content} placeholder="Type your message..." onChange={changeMessage} />
        <button onClick={() => processMessage()}>Send</button>
      </div>
    </div>
  );
}