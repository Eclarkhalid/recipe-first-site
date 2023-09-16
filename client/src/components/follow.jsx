import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../userContext";

export default function FollowButton({ authorId }) {
  const { userInfo, setUserInfo } = useContext(UserContext); // Adding setUserInfo
  const [isFollowing, setIsFollowing] = useState(false);

  // Check if the user is already following the author
  useEffect(() => {
    setIsFollowing(userInfo.following.includes(authorId));
  }, [userInfo.following, authorId]);

  const handleFollow = () => {
    fetch(`http://localhost:4000/user/follow/${authorId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ userId: userInfo.id }),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsFollowing(true);
        setUserInfo(prevUserInfo => ({
          ...prevUserInfo,
          following: [...prevUserInfo.following, authorId] // Update following in state
        }));
        console.log("Follow successful:", data);
      })
      .catch((error) => {
        console.error("Follow error:", error);
      });
  };

  const handleUnfollow = () => {
    fetch(`http://localhost:4000/user/unfollow/${authorId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ userId: userInfo.id }),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsFollowing(false);
        setUserInfo(prevUserInfo => ({
          ...prevUserInfo,
          following: prevUserInfo.following.filter(id => id !== authorId) // Update following in state
        }));
        console.log("Unfollow successful:", data);
      })
      .catch((error) => {
        console.error("Unfollow error:", error);
      });
  };

  return (
    <div>
      {userInfo.id !== authorId && (
        <button
          onClick={isFollowing ? handleUnfollow : handleFollow}
          className={`${
            isFollowing ? "bg-red-500 text-white" : "bg-blue-500 text-white"
          } px-2 py-1 rounded-md mt-2`}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      )}
    </div>
  );
}
