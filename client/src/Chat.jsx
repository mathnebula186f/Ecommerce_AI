import { func } from "prop-types";
import { useContext, useEffect, useRef, useCallback } from "react";
import { useState } from "react";
import Avatar from "./Avatar";
import Logo from "./Logo";
import { UserContext } from "./UserContext";
import { _ } from "lodash";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useSocket } from "./SocketProvider";
import peer from "./peer";
import ReactPlayer from "react-player";
import BackGroundImage from "./BackGroundImage";

export default function Chat() {
  const [onlinePeople, setOnlinePeople] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { username, id, logout,token,setId } = useContext(UserContext);
  const [newMessageText, setnewMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const divUnderMessages = useRef();
  const [allPeople, setAllPeople] = useState({});

  

  useEffect(() => {
    setId(localStorage.getItem("id"))
    // connectToWs();
  }, []);

 

  

  useEffect(() => {
    axios.get("/ShowAllPeople").then((res) => {
      setAllPeople(res.data);
    });
  }, []);
  function showOnlinePeople(peopleArray) {
    const people = {};
    peopleArray.forEach(({ userId, username }) => {
      console.log("person=", username);
      people[userId] = username;
    });
    //console.log("Here are ll the people" +people);
    setOnlinePeople(people);
  }
  function handleMessage(ev) {
    const messageData = JSON.parse(ev.data);
    //console.log("Here is the messageData===="+messageData.text);
    //console.log("Im here");
    //console.log("hiiii==="+{ev,messageData});
    if ("online" in messageData) {
      showOnlinePeople(messageData.online);
    } else if ("text" in messageData) {
      //console.log("Message came="+messageData.text);
      //console.log('Hoo');
      setMessages((prev) => [...prev, { ...messageData }]);
      // this.forceUpdate();
      //console.log('Here is the messageData snedeer=='+{...messageData}._id);
    }
    //console.log('gone');
    //console.log(ev.data);
    // ev.data.text().then(messageString =>{
    //     console.log(messageString);
    // });
    //console.log('new Message',ev);
  }
  function selectContact(userId) {
    console.log("clicked user id"+ userId);

    setSelectedUserId(userId);
  }

  async function sendMessage(ev) {
    ev.preventDefault();
    console.log("sending message Called in FrontEnd");
    console.log("send a message sender id=",id)

    try {
      const response1 = await fetch('https://e-commerce-chatbot.onrender.com/predict', {
        method: 'POST',
        body: JSON.stringify({ message:newMessageText }),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
          },
      });
      const data1 = await response1.json();
      //data1.answer will be my answer

      if (!response1.ok) {
        throw new Error(`Fetch error: ${response1}`);
    }
    else{
      const response = await axios.post("/sendMessage", {
        recipient: selectedUserId,
        text: newMessageText,
        sender:  localStorage.getItem("id"),
        answer:data1.answer,
      });
  
      if (response.status == 200) {
        console.log("Message you typed= " + newMessageText);
        setnewMessageText("");
        console.log("Got answer=",data1.answer)
        setMessages((prev) => [
          ...prev,
          {
            text: newMessageText,
            sender: id,
            recipient: selectedUserId,
            _id: Date.now(),
          },
          {
            text:data1.answer,
            sender: "664a5eff7a33c4c28b6574d7",
            recipient: id,
            _id:Date.now()+1,
          },
        ]);
        //console.log("Message has been sent by form");
        // location.reload();
        this.forceUpdate();
        // UpdateOnlinePeople();
  
      } else {
        console.log("Some Error occured while sending Message", response);
      }
    }


    
    } catch (error) {
      console.log("Some error occured while sending message=",error)
    }

    
    // ws.send(JSON.stringify({
    //     recipient : selectedUserId,
    //     text: newMessageText,
    // }));
  }

  useEffect(() => {
    const div = divUnderMessages.current;
    if (div) {
      div.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  useEffect(() => {
    if (selectedUserId) {
      console.log("selecgred user id=",selectedUserId)
      axios.post("/messages/" + selectedUserId,{userId:selectedUserId,token:token}).then((res) => {
        // const {data}=res;

        setMessages(res.data);
      });
    }
  }, [selectedUserId]);

  const onlinePeopleExclOurUser = { ...onlinePeople };
  delete onlinePeopleExclOurUser[id];
  //console.log("online people excluding user=",onlinePeopleExclOurUser);
  //console.log("online people =",{...onlinePeople});

  const messagesWithoutDupes = _.uniqBy(messages, "_id");
  //console.log(messagesWithoutDupes);

  async function handleLogout(){
    try {
      // const repsonse =axios.post("/logout",{username});
      logout();
    } catch (error) {
      console.log(error)
    }
    
  }

 
  return (
    <div className="flex h-screen font-montserrat">
      <div className="bg-white w-1/3">
        <Logo />
        <div
          onClick={() => selectContact("664a5eff7a33c4c28b6574d7")}
          className={
            "border-b border-gray-100  flex item-center gap-2 cursor-pointer " +
            ("664a5eff7a33c4c28b6574d7" === selectedUserId ? "bg-green-50" : "")
          }
        >
          {"664a5eff7a33c4c28b6574d7" === selectedUserId && (
            <div className="w-1 bg-green-500 h-12 rounded-r-md"></div>
          )}
          <div className="flex gap-2 py-2 pl-4 items-center">
            <Avatar username="Chatbot" userId="664a5eff7a33c4c28b6574d7" />
            <span className="text-gray-800">Chatbot</span>
          </div>
        </div>
        <div
          className="flex gap-2 my-10 items-center justify-center bg-green-500 border m-8 rounded-xl w-fit p-2"
          onClick={logout}
        >
          <button className="" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <div className="flex flex-col bg-green-50 w-2/3 p-2">
        <div className="flex-grow">
          {!selectedUserId && (
            <div className="flex h-full items-center justify-center">
              <div className="text=gray-300">
                &larr; Select The Chatbot from SideBar
              </div>
            </div>
          )}
          {!!selectedUserId && (
            <div className="z-1 relative h-full pb-4">
              <div className="text-center ">
                <BackGroundImage />
              </div>
              <div className="z-1 overflow-y-scroll absolute inset-0">
                {messagesWithoutDupes.map((message) => (
                  <div
                    key={message._id}
                    className={
                      message.sender === id ? " text-right" : " text-left"
                    }
                  >
                    <div
                      key={message._id}
                      className={
                        "inline-block p-2 my-2 rounded-md text-sm " +
                        (message.sender === id
                          ? " bg-green-500 text-white "
                          : " bg-white text-gray-500")
                      }
                    >
                      {message.text}
                      {message.recipient === "653546af0562f26076aebdbd" && (
                        <div className="font-bold">
                          By {allPeople[message.sender]}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={divUnderMessages}></div>
              </div>
            </div>
          )}
        </div>
        {!!selectedUserId && (
          <form className="flex gap-2" onSubmit={sendMessage}>
            <input
              value={newMessageText}
              onChange={(ev) => setnewMessageText(ev.target.value)}
              type="text"
              placeholder="Type your messages here"
              className="bg-white flex-grow border rounded-sm p-2"
            />
            <button
              type="submit"
              className="bg-green-500 p-2 text-white rounded-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
