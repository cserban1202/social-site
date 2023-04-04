import React from 'react';
import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsFillHandThumbsUpFill } from "react-icons/bs";



function Home() {
  let history = useNavigate();

  const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPosts(response.data);
    });
  }, [])

  const likeAPost = (postId) => {
    if (!localStorage.getItem("accessToken")) {
      toast.error("Please log in to like a post!");
      return;
    }

    axios
      .post(
        "http://localhost:3001/likes",
        { PostId: postId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === postId) {
              if (response.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                const likesArray = post.Likes;
                likesArray.pop();
                return { ...post, Likes: likesArray };
              }
            } else {
              return post;
            }
          })
        );
      });
  };

  return (
    <div>
      <ToastContainer />
      {listOfPosts.map((value, key) => {
        return (
          <div key={key} className="post" >
            <div className="title">{value.title} </div>
            <div className="body" onClick={() => { history(`/post/${value.id}`) }}> {value.postText} </div>
            <div className="footer "> {value.username}
              <BsFillHandThumbsUpFill className="paddingLeft" onClick={() => { likeAPost(value.id) }} />
              {/* <button onClick={() => { likeAPost(value.id) }}>Like</button> */}
              <label>{value.Likes.length} </label>
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default Home
