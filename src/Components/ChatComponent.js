import React, { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import { v4 as uuidv4 } from "uuid";
import SendMessageInput from "./SendMessageInput";
import chatBackground from "../Assets/chatBackground.svg";
import TeacherApi from "../APIs/TeachersApi";
import { useContext } from "react";
import NotificationContext from "./NotificationContext";
import ChatUserList from "./ChatUserList";
import AdminApi from "../APIs/AdminApi";
import ChatMessagesList from "./ChatMessagesList";
import StudentApi from "../APIs/StudentApi";

function ChatComponent({ publishName, role }) {
  const [stompClient, setStompClient] = useState();
  const userNameSender = publishName;
  const userType = role;
  const [messagesReceived, setMessagesReceived] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const { notification, setNotification } = useContext(NotificationContext);

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  }, [notification, setNotification]);

  useEffect(() => {
    setNotification(null);
  }, []);

  const onSelectRecipient = (user) => {
    setSelectedUser(user);
  };

  const getUsers = () => {
    if (userType === "Admin") {
      TeacherApi.getAllTeachers()
        .then((response) => {
          setUsers(response.teachers);
          setSelectedUser(response?.teachers?.[0]);
        })
        .catch((error) => {
          setNotification({
            message: error.response.data.message,
            type: "error",
          });
        });
    }
    if (userType === "Teacher") {
      Promise.all([AdminApi.getAllAdmins(), StudentApi.getAllStudents()])
        .then(([adminResponse, studentResponse]) => {
          setUsers([...adminResponse.admins, ...studentResponse.students]);
          setSelectedUser(adminResponse?.admins?.[0]);
        })
        .catch((error) => {
          setNotification({
            message: error.response.data.message,
            type: "error",
          });
        });
    }
    if (userType === "Student") {
      TeacherApi.getAllTeachers()
        .then((response) => {
          setUsers(response.teachers);
          setSelectedUser(response?.teachers?.[0]);
        })
        .catch((error) => {
          setNotification({
            message: error.response.data.message,
            type: "error",
          });
        });
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (userNameSender) {
      setupStompClient(userNameSender);
    }
  }, []);

  const setupStompClient = (userName) => {
    // stomp client over websockets
    const stompClient = new Client({
      brokerURL: "ws://localhost:8080/ws",
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    stompClient.onConnect = () => {
      // subscribe to the backend "private" topic
      stompClient.subscribe(`/user/${userName}/queue/inboxmessages`, (data) => {
        onMessageReceived(data);
      });
    };
    // initiate client
    stompClient.activate();

    // maintain the client for sending and receiving
    setStompClient(stompClient);
  };

  // send the data using Stomp
  const sendMessage = (newMessage) => {
    if (!newMessage.text) return;
    if (!selectedUser) return;
    const payload = {
      id: uuidv4(),
      from: userNameSender,
      to: selectedUser.hasOwnProperty("publishName")
        ? selectedUser.publishName
        : `${selectedUser.firstName}${selectedUser.lastName}`,
      text: newMessage.text,
    };
    if (payload.to) {
      stompClient.publish({
        destination: `/user/${payload.to}/queue/inboxmessages`,
        body: JSON.stringify(payload),
      });
    }
  };

  // display the received data
  const onMessageReceived = (data) => {
    const message = JSON.parse(data.body);
    setMessagesReceived((messagesReceived) => [...messagesReceived, message]);
  };

  const renderTitle = () => {
    if (userType === "Admin") {
      return "Chat with Teachers";
    } else if (userType === "Teacher") {
      return "Chat with Admins and Students";
    } else if (userType === "Student") {
      return "Chat with Teachers";
    }
  };

  return (
    <div>
      <h1 className=" text-4xl font-bold tracking-tight mb-8 text-slate-200">
        {renderTitle()}
      </h1>
      <div className="flex  h-[75vh] rounded-xl w-full  ">
        {/* <!-- User List --> */}
        <div className="flex flex-col w-1/4 overflow-y-auto bg-gray-700 border-r-2 rounded-l-xl ">
          {/* <!-- search compt --> */}
          <div className=" py-4 px-2 border-b-2">
            <input
              type="text"
              placeholder="search chatting"
              className="py-2 px-2 border-b-2 border-slate-200 rounded-2xl w-full"
            />
          </div>
          {/* <!-- end search compt --> */}

          {/* <!-- user list --> */}

          <ChatUserList
            users={users}
            selectedUser={selectedUser}
            onSelectUser={onSelectRecipient}
            userType={userType}
          />

          {/* <!-- end user list --> */}
        </div>

        {/* <!-- Chat Section --> */}
        {/* <!-- chat list --> */}
        <div className="flex flex-col flex-auto h-full w-3/4 ">
          <div
            className="flex flex-col flex-auto flex-shrink-0 rounded-r-xl h-full"
            style={{ backgroundImage: `url(${chatBackground})` }}
          >
            <div className="flex flex-col h-full overflow-x-auto mb-4">
              <div className="flex flex-col h-full">
                <ChatMessagesList
                  messagesReceived={messagesReceived}
                  userNameSender={userNameSender}
                  selectedUser={selectedUser}
                  userType={userType}
                />
              </div>
            </div>

            <SendMessageInput
              username={userNameSender}
              onMessageSend={sendMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatComponent;
