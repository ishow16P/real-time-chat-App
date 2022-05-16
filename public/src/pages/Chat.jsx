import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { ChatContainer } from '../components/ChatContainer';
import { Contacts } from '../components/Contacts';
import { Welcome } from '../components/Welcome';
import { allUserRoute,host } from '../utils/APIRoutes';
import {io} from "socket.io-client"

export const Chat = () => {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts,setContacts] = useState([]);
  const [currentUser,setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  const checkUser = async () =>{
    if(!localStorage.getItem('chat-app-user')) {
      navigate('/login')
    }else{
      setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")))
      setIsLoaded(true);
    }
  }

  const checkAvatar = async() => {
    try {
      if(currentUser){
        if(currentUser.isAvatarImageSet){
          const data = await axios.get(`${allUserRoute}/${currentUser._id}`)
          setContacts(data.data.users);
        }else{
          navigate('/setAvatar')
        }
      }
    } catch (error) {
      console.log(error);
    }
   
  }
  useEffect(() =>{
    checkUser();
  },[])
  useEffect(() =>{
    if(currentUser){
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  },[currentUser])
  useEffect(()=>{
     checkAvatar();
  },[currentUser]);
  const hadleChatChange = async (chat) =>{
    setCurrentChat(chat)
  }

  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={hadleChatChange}/>
        {
          isLoaded && currentChat === undefined ? (
            <Welcome currentUser={currentUser}/>
          ) : (
            <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>
          )
        }
        
      </div>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display:flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px){
      grid-template-columns: 35% 65%;
    }
  }
`;