import { AiOutlineHome, AiOutlineUser, AiOutlineSetting, AiOutlineCalendar, AiOutlineApartment, AiOutlineMenu, AiOutlineBook, AiOutlineRead, AiOutlineWarning } from "react-icons/ai";
import { useRouter } from 'next/router';
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../utils/userContext';
import { gql, useLazyQuery } from "@apollo/client";
import { clientMutator } from "@/utils/graphqlManager";
import { useMutation } from "@apollo/client";



import Header from "./Header"
import Chat from "../components/Chat";
import FriendsList from "../components/FriendList";
import EventList from "./EventList";









export default function Home({ screenWidth, children }) {

    const router = useRouter();

    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [headerVisible, setHeaderVisible] = useState(true)

    const [actPage, setActPage] = useState(0);
    const [isNavigating, setIsNavigating] = useState(false);

    const { userInfo, user, chats } = useContext(UserContext);


    useEffect(() => {
        if (!user) {
            userInfo().then(info => {
                console.log("Usuario Conectado", info)
            })
        }

    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            const isHeaderVisible = prevScrollPos > currentScrollPos || currentScrollPos < 20;

            setPrevScrollPos(currentScrollPos);
            setHeaderVisible(isHeaderVisible);

        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos]);

    const handleMenuTransitions = (idx) => {
        if (idx === actPage || isNavigating) {
            return;
        }

        setIsNavigating(true);
        setActPage(idx);
    };
    useEffect(() => {
        let navigationTimeout = null;

        if (isNavigating) {
            document.title = 'Cargando...'; // Set the title to show the spinner

            navigationTimeout = setTimeout(() => {
                let href = actPage == 0 ? '/Feed' : '/Friends';
                switch (actPage) {
                    case 0:
                        href = '/Feed';
                        break;
                    case 1:
                        href = '/Friends';
                        break;
                    case 2:
                        href = '/Events';
                        break;
                    case 3:
                        href = '/GroupPage';
                        break;
                    case 4:
                        href = '/Notas';
                        break;
                    case 5:
                        href = '/CheckReportes';
                        break;
                    default:
                        href = '/Feed';
                        break;
                }
                router.push(href);
            }, 200);
        } else {
            document.title = 'uChat - Home'; // Restore the original title
        }

        return () => {
            if (navigationTimeout) {
                clearTimeout(navigationTimeout);
                setIsNavigating(false);
            }
        };
    }, [isNavigating, actPage, router]);




    return (<>

        {user &&
            <div className="flex justify-center items-start ">

                {/* Seccion Izquierda */}
                {screenWidth >= 1024 &&
                    <>
                        <div className={`fixed flex flex-col items-center w-[20vw] z-2 left-8 ${headerVisible ? "transform transition-transform duration-100 ease-in-out translate-y-[90px]" :
                            "transform transition-transform duration-100 ease-in-out translate-y-[30px]"}`}>

                            {/* Boton Perfil */}
                            <div className="flex justify-start items-center bg-foreground w-full h-[100px] rounded-[10px] overflow-hidden cursor-pointer hover:bg-primary hover:text-foreground shadow-md">
                                <img className="object-cover w-[60px] h-[60px] rounded-[6px] mr-4 ml-4" src={user.foto_perfil} alt={`${user.username}'s profile picture`} />

                                <div className="flex flex-col ml-1 mt-3 mb-3 mr-[20px]  w-[calc(100%-150px)]">
                                    <h2 className="text-[18px] font-bold whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[100%]">{user.username}</h2>
                                    <p className="mt-1 text-base whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[100%]">{user.correo}</p>
                                </div>
                                <AiOutlineMenu className="w-[1.5rem] h-[1.5rem] mr-[15px]" />

                            </div>


                            {/* Menu isquierdo */}
                            <div className="flex flex-col bg-foreground w-full mt-[30px] rounded-lg overflow-hidden shadow-md">
                                {homeMenuElements({ actPage, handleMenuTransitions })}
                            </div>
                        </div>
                        <div className={`fixed flex flex-col items-center w-[20vw] z-2 right-8 
                            ${headerVisible ? "transform transition-transform duration-100 ease-in-out translate-y-[90px]" :
                                "transform transition-transform duration-100 ease-in-out translate-y-[30px]"}`}>
                            {/*Seccion derecha*/  /* AKI VA MI COMPONENTE*/}
                            <EventList />
                            <HorarioList />
                            <FriendsList friends={user.amigos} hide={actPage === 1} />
                        </div>
                    </>
                }


                {/* Chats */}
                <div className="fixed z-20 bottom-0 flex right-0 items-end pointer-events-none">
                    {chats.filter((x) => x.active).map((chat) => (
                        <Chat key={chat.id} chatInfo={chat} user={user} />
                    ))}
                </div>
                <Header headerVisible={headerVisible} screenWidth={screenWidth} user={user} menuElements={homeMenuElements({ actPage, handleMenuTransitions })} />

                <div className="overflow-hidden ">
                    <div className={`absolute left-0 right-0 z-[-1] flex justify-center items-start ${isNavigating ? "animate-verticalOut" : "animate-verticalIn"}`}>
                        {children}
                    </div>
                </div>
            </div>

        }


    </>
    );
}




const homeMenuElements = ({ actPage, handleMenuTransitions }) => {
    const buttStyle = "flex justify-start items-center w-full h-[60px] p-[20px] pl-[30px] text-lg font-bold text-secondary transition-colors border-b border-background hover:bg-primary hover:text-foreground"

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


    return (
        <>
            <button className={buttStyle} {...actButtonStyle(0)} onClick={() => handleMenuTransitions(0)}>
                <AiOutlineHome className="w-[25px] h-[25px] mr-[3vw]" /> Feed </button>

            <button className={buttStyle} {...actButtonStyle(1)} onClick={() => handleMenuTransitions(1)}>
                <AiOutlineUser className="w-[25px] h-[25px] mr-[3vw]" /> Amigos </button>

            <button className={buttStyle} {...actButtonStyle(2)} onClick={() => handleMenuTransitions(2)}>
                <AiOutlineCalendar className="w-[25px] h-[25px] mr-[3vw]" /> Eventos </button>

            <button className={buttStyle} {...actButtonStyle(3)} onClick={() => handleMenuTransitions(3)}>
                <AiOutlineApartment className="w-[25px] h-[25px] mr-[3vw]" /> Comunidades </button>

            <button className={buttStyle} {...actButtonStyle(4)} onClick={() => handleMenuTransitions(4)}>
                <AiOutlineRead className="w-[25px] h-[25px] mr-[3vw]" /> Notas </button>

            <button className={buttStyle} {...actButtonStyle(5)} onClick={() => handleMenuTransitions(5)}>
                <AiOutlineWarning className="w-[25px] h-[25px] mr-[3vw]" /> Reportes </button>
        </>
    )
}


const HorarioList = () => {


    const { user } = useContext(UserContext);
    const [horario, setHorario] = useState([]);


    const BUSCAR_HORARIO_USUARIOID = gql`
    query BuscarHorarioUsuario($usuario: ID!) {
      buscarHorarioUsuario(usuario: $usuario) {
        id
        dia
        hora_inicio
        hora_termino
        asignatura
        sala
        acronimo
      }
    }
  `;


    const [buscarHorarioUsuario, { loading, data }] = useLazyQuery(
        BUSCAR_HORARIO_USUARIOID,
        {
            variables: { usuario: user.id },
            onCompleted: (data) => {
                setHorario(data.buscarHorarioUsuario);
            },
        }
    );


    useEffect(() => {
        buscarHorarioUsuario();

    }, []);

    const formatHour = (time) => {
        const formattedTime = new Date(time);
        return formattedTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };

    const removeTildes = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    const today = new Date().toLocaleDateString('es-ES', { weekday: 'long' });
    const todayWithoutTildes = removeTildes(today);



    const eventList = horario.map((event) => {
        const eventDia = event.dia.toLowerCase();
        const eventDiaWithoutTildes = removeTildes(eventDia);
        if (eventDiaWithoutTildes === todayWithoutTildes.toLowerCase()) {
            return (
                <li key={event.id} className="flex flex-row border-b snap-start border-background border-dotted p-2 hover:bg-primary hover:text-background">
                    <div className="flex relative mt-[5px]">
                        <AiOutlineBook className="text-8xl text-secondary" />
                        <h1 className="absolute text-secondary text-[11px] text-center w-[55px] left-[20px] bottom-6 font-bold">{event.dia}</h1>
                    </div>
                    <div className="m-2 flex-wrap overflow-hidden text-ellipsis flex-col h-[85px] max-w-[60%] grow">
                        <h1 className="text-xl font-bold">{event.asignatura}</h1>
                        <h1 className="text-sm line-clamp-3 text-justify w-[100%] max-w-[100%] ">{event.sala}</h1>
                        <h1 className="text-sm line-clamp-3 text-justify w-[100%] max-w-[100%] ">{event.acronimo}</h1>
                        <h1 className="text-sm line-clamp-3 text-justify w-[100%] max-w-[100%] ">{formatHour(event.hora_inicio)} - {formatHour(event.hora_termino)}</h1>
                    </div>
                </li>
            );
        } else {

            return null;
        }
    });

    const hasClasses = eventList.some((event) => event !== null);

    return (
        <>
            <div className="mb-2 w-[100%]">
                <h2 className="flex font-bold justify-self-center mr-auto ml-[10px] mb-[10px] text-secondary opacity-80 "> HORARIOS </h2>
                <ul className="list-container flex flex-col snap-y max-h-64 overflow-hidden overflow-y-scroll rounded-md bg-foreground">
                    {hasClasses ? eventList : <p className=" font-bold  flex items-center justify-center h-64">¡Hoy no tienes clases!</p>
                    }
                </ul>
            </div>
        </>
    );
}


