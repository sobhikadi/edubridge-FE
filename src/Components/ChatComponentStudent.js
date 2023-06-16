import React, { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import { v4 as uuidv4 } from "uuid";
import SendMessageInput from "./SendMessageInput";
import chatBackground from "../Assets/chatBackground.svg";
import { useContext } from "react";
import NotificationContext from "./NotificationContext";
import ChatUserList from "./ChatUserList";
import ChatMessagesList from "./ChatMessagesList";

function ChatComponentStudent({ publishName, courses }) {
  const stompClient = useRef();
  const userNameSender = publishName;
  const [messagesReceived, setMessagesReceived] = useState([]);
  const [userInfoReceivers, setUsersInfoReceivers] = useState([]);
  const [selectedUserReceiver, setSelectedUserReceiver] = useState();
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
    setSelectedUserReceiver(user);
  };

  useEffect(() => {
    if (userNameSender) {
      setupStompClient(userNameSender);
      // Return a cleanup function
      return () => {
        if (stompClient.current) {
          if (stompClient.current.subscription) {
            stompClient.current.subscription.unsubscribe();
          }
          stompClient.current.deactivate();
        }
      };
    }
  }, []);

  const setupStompClient = (userName) => {
    // stomp client over websockets
    const stompClientInstance = new Client({
      brokerURL: "ws://localhost:8080/ws",
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    stompClientInstance.onConnect = () => {
      // subscribe to the backend "private" topic
      const subscription = stompClientInstance.subscribe(
        `/user/${userName}/queue/inboxmessages`,
        (data) => {
          onMessageReceived(data);
        }
      );
      // Save the subscription in the stompClient object
      stompClientInstance.subscription = subscription;
    };
    // initiate client
    stompClientInstance.activate();

    // maintain the client for sending and receiving
    stompClient.current = stompClientInstance;
  };

  // send the data using Stomp
  const sendMessage = (newMessage) => {
    if (!newMessage.text) return;
    if (!selectedUserReceiver) return;
    const payload = {
      id: uuidv4(),
      from: userNameSender,
      to: selectedUserReceiver.publishName,
      text: newMessage.text,
    };
    if (payload.to && stompClient.current) {
      stompClient.current.publish({
        destination: `/user/${payload.to}/queue/inboxmessages`,
        body: JSON.stringify(payload),
      });
      // Update the state to include the new message
      setMessagesReceived((prevMessages) => [...prevMessages, payload]);
    }
  };

  // display the received data
  const onMessageReceived = (data) => {
    const message = JSON.parse(data.body);
    setMessagesReceived((messagesReceived) => [...messagesReceived, message]);
  };

  const handelCourseChange = (e) => {
    const coursePublisher = e.target.value;
    if (coursePublisher === "Select a Course") {
      setUsersInfoReceivers([]);
      setSelectedUserReceiver(null);
      return;
    }
    if (coursePublisher) {
      const newUsersInfo = [
        {
          role: "Teacher",
          publishName: coursePublisher,
        },
      ];
      setUsersInfoReceivers(newUsersInfo);
      setSelectedUserReceiver(newUsersInfo[0]);
    }
  };

  return (
    <div>
      <h1 className=" text-4xl font-bold tracking-tight mb-8 text-slate-200">
        Chat with Teachers
      </h1>
      <div className="flex  h-[75vh] rounded-xl w-full  ">
        {/* <!-- User List --> */}
        <div className="flex flex-col w-1/4 overflow-y-auto bg-gray-700 border-r-2 rounded-l-xl ">
          {/* <!-- select course --> */}

          <div className="py-3 px-2 ">
            <label
              htmlFor="course"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select Course
            </label>
            <select
              id="course"
              name="course"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => handelCourseChange(e)}
              required
            >
              <option value="Select a Course">Select a Course</option>

              {courses !== null &&
                courses.length > 0 &&
                courses.map((course) => {
                  return (
                    <option
                      key={course.course.id}
                      value={course.course.provider}
                    >
                      {course.course.title}
                    </option>
                  );
                })}
            </select>
          </div>

          {/* <!-- end select course --> */}

          {/* <!-- search compt --> */}
          <div className=" py-4 px-2 border-b-2">
            <input
              type="text"
              placeholder="search chatting"
              className="py-2 px-2 border-b-2 border-slate-200 rounded-xl w-full"
            />
          </div>
          {/* <!-- end search compt --> */}

          {/* <!-- user list --> */}

          <ChatUserList
            users={userInfoReceivers}
            selectedUser={selectedUserReceiver}
            onSelectUser={onSelectRecipient}
            userType={"Student"}
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
                  selectedUser={selectedUserReceiver}
                  userType={"Student"}
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

export default ChatComponentStudent;
