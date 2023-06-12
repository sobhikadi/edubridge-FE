import React from "react";

function ChatMessagesList({ messagesReceived, userNameSender, selectedUser }) {
  const relevantMessages = messagesReceived.filter(
    (message) =>
      (message.from === selectedUser?.publishName &&
        message.to === userNameSender) ||
      (message.from === userNameSender &&
        message.to === selectedUser?.publishName)
  );
  return (
    <div className="grid grid-cols-12 gap-y-2 py-2">
      {relevantMessages.length > 0 &&
        relevantMessages.map((message) => {
          if (message.from === selectedUser?.publishName) {
            return (
              <div
                className="col-start-1 col-end-8 px-3 py-1 rounded-lg"
                key={message.id}
              >
                <div className="flex flex-row items-center">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                    A
                  </div>
                  <div className="relative ml-3 text-sm whitespace-normal break-words bg-white py-2 px-4 shadow rounded-xl">
                    <div>{message.text}</div>
                  </div>
                </div>
              </div>
            );
          } else if (message.from === userNameSender) {
            return (
              <div
                className="col-start-6 col-end-13 px-3 py-1 rounded-lg"
                key={message.id}
              >
                <div className="flex items-center justify-start flex-row-reverse">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                    A
                  </div>
                  <div className="relative mr-3 text-sm whitespace-normal break-words bg-indigo-100 py-2 px-4 shadow rounded-xl">
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
