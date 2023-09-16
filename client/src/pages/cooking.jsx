import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const cooking = () => {
  const [cookingTipsPosts, setCookingTipsPosts] = useState([]);

  useEffect(() => {
    fetch('https://recipe-rise.onrender.com/post?category=Cooking%20Tips') // Update the URL based on your backend API
      .then(response => response.json())
      .then(posts => {
        setCookingTipsPosts(posts);
      });
  }, []);

  return (
    <div>
      <h1>Cooking Tips</h1>
      <ul>
        {cookingTipsPosts.map(post => (
          <li key={post._id}>
            <Link to={`/post/${post._id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default cooking;
