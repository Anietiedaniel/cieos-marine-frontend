import React from "react";

const MessageList = () => {
  return (
    <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-4 bg-white p-4 rounded-full shadow-sm">
        <div className="w-10 h-10 bg-[#708B53] rounded-full flex items-center justify-center opacity-20 text-white font-bold">
          G
        </div>
      </div>
      <h2 className="text-xl font-bold text-gray-800 mb-1">Team Hub</h2>
      <p className="text-sm text-gray-400 max-w-[200px]">
        There is no message for this team, click on start a chat to write a message
      </p>
    </div>
  );
};

export default MessageList;