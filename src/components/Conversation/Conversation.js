/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import "./Conversation.css";
import userService from "../../services/user.service";

function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const fetchData = async () => {
    try {
      const otherUserId = conversation.members.find(
        (member) => member !== currentUser._id
      );
      const response = await userService.getUsersProfile(otherUserId);
      setUser(response.data);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="conversation mb-3">
      {errorMessage && <p>{errorMessage}</p>}
      {user && (
        <div>
          <img
            src={user.imageUrl}
            alt="user"
            className="custom-conversation-img me-2"
          />
          <span className="conversation-name">{user.username}</span>
        </div>
      )}
    </div>
  );
}

export default Conversation;
