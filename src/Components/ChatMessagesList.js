import React from "react";

function ChatMessagesList({ messagesReceived, userNameSender, selectedUser }) {
  return (
    <div className="grid grid-cols-12 gap-y-2">
      {messagesReceived.length > 0 &&
        messagesReceived.map((message) => {
          if (message.from === selectedUser?.publishName) {
            return (
              <div
                className="col-start-1 col-end-8 p-3 rounded-lg"
                key={message.id}
              >
                <div className="flex flex-row items-center">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                    A
                  </div>
                  <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                    <div>{message.text}</div>
                  </div>
                </div>
              </div>
            );
          } else if (message.from === userNameSender) {
            return (
              <div
                className="col-start-6 col-end-13 p-3 rounded-lg"
                key={message.id}
              >
                <div className="flex items-center justify-start flex-row-reverse">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                    A
                  </div>
                  <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                    <div>{message.text}</div>
                  </div>
                </div>
              </div>
            );
          }
        })}
    </div>
  );
}

export default ChatMessagesList;
