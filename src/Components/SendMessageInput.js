import { useState } from "react";

const SendMessageInput = (props) => {
  const [message, setMessage] = useState("");

  if (!props.username) {
    return <></>;
  }

  const onMessageSend = () => {
    props.onMessageSend({ text: message });
    setMessage("");
  };

  const onSubmit = (event) => {
    event.preventDefault();
    onMessageSend();
  };

  return (
    <form id="sendMessagesForm" onSubmit={onSubmit}>
      <div className="flex flex-row items-center h-16 bg-gray-600 w-full px-4 py-4 rounded-br-xl">
        <div className="flex-grow">
          <input
            id="message"
            type="text"
            className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
            placeholder="Type your message..."
            onChange={(event) => setMessage(event.target.value)}
            value={message}
            required
          />
        </div>
        <div className="ml-4">
          <button className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-800 rounded-xl text-slate-200 px-8 py-2 flex-shrink-0">
            <span>Send</span>
            <span className="ml-2">
              <svg
                className="w-4 h-4 transform rotate-45 -mt-px"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                ></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SendMessageInput;
