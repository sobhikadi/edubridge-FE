import React, { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import { v4 as uuidv4 } from "uuid";
import SendMessageInput from "./SendMessageInput";
import ChatMessageInput from "./ChatMessageInput";
import chatBackground from "../Assets/chatBackground.svg";

function ChatComponent({ publishName }) {
  const [stompClient, setStompClient] = useState();
  const userName = publishName;
  const [messagesReceived, setMessagesReceived] = useState([]);

  const setupStompClient = (userName) => {
    // stomp client over websockets
    const stompClient = new Client({
      brokerURL: "ws://localhost:8080/ws",
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    stompClient.onConnect = () => {
      // subscribe to the backend public topic
      stompClient.subscribe("/topic/publicmessages", (data) => {
        console.log(data);
        onMessageReceived(data);
      });

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
    const payload = {
      id: uuidv4(),
      from: userName,
      to: newMessage.to,
      text: newMessage.text,
    };
    if (payload.to) {
      stompClient.publish({
        destination: `/user/${payload.to}/queue/inboxmessages`,
        body: JSON.stringify(payload),
      });
    } else {
      console.log("other message");
    }
  };

  // display the received data
  const onMessageReceived = (data) => {
    const message = JSON.parse(data.body);
    setMessagesReceived((messagesReceived) => [...messagesReceived, message]);
  };

  useEffect(() => {
    if (userName) {
      setupStompClient(userName);
    }
  }, []);

  return (
    <div>
      <h1 className=" text-4xl font-bold tracking-tight mb-8 text-slate-200">
        Chat with Teacher
      </h1>
      <div class="flex  h-[75vh] rounded-xl w-full  ">
        {/* <!-- User List --> */}
        <div class="flex flex-col w-1/4 overflow-y-auto bg-gray-700 border-r-2 rounded-l-xl ">
          {/* <!-- search compt --> */}
          <div class=" py-4 px-2 border-b-2">
            <input
              type="text"
              placeholder="search chatting"
              class="py-2 px-2 border-b-2 border-slate-200 rounded-2xl w-full"
            />
          </div>
          {/* <!-- end search compt --> */}

          {/* <!-- user list --> */}

          <div class="flex flex-row py-4 px-2 justify-center items-center text-slate-200 ">
            <div class="w-1/4">
              <img
                src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
                class="object-cover h-12 w-12 rounded-full"
                alt=""
              />
            </div>
            <div class="w-full">
              <div class="text-lg font-semibold">Luis1994</div>
            </div>
          </div>

          {/* <!-- end user list --> */}
        </div>

        {/* <!-- Chat Section --> */}
        {/* <!-- chat list --> */}
        <div class="flex flex-col flex-auto h-full w-3/4 ">
          <div
            class="flex flex-col flex-auto flex-shrink-0 rounded-r-xl h-full"
            style={{ backgroundImage: `url(${chatBackground})` }}
          >
            <div class="flex flex-col h-full overflow-x-auto mb-4">
              <div class="flex flex-col h-full">
                <div class="grid grid-cols-12 gap-y-2">
                  <div class="col-start-1 col-end-8 p-3 rounded-lg">
                    <div class="flex flex-row items-center">
                      <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                        A
                      </div>
                      <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                        <div>Hey How are you today?</div>
                      </div>
                    </div>
                  </div>
                  <div class="col-start-1 col-end-8 p-3 rounded-lg">
                    <div class="flex flex-row items-center">
                      <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                        A
                      </div>
                      <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                        <div>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Vel ipsa commodi illum saepe numquam maxime
                          asperiores voluptate sit, minima perspiciatis.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-start-6 col-end-13 p-3 rounded-lg">
                    <div class="flex items-center justify-start flex-row-reverse">
                      <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                        A
                      </div>
                      <div class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                        <div>I'm ok what about you?</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <SendMessageInput username={userName} onMessageSend={sendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatComponent;

//     <ChatMessageInput
//       username={userName}
//       messagesReceived={messagesReceived}
//     />
