import React, {useContext} from 'react';
import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsFillHandThumbsUpFill } from "react-icons/bs";
import { AuthContext } from '../helpers/AuthContext';



function Home() {
  let history = useNavigate();

  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    if(!localStorage.getItem("accessToken")) {
      history("/login");
    } else{
    axios.get("http://localhost:3001/posts",
      { headers: { accessToken: localStorage.getItem("accessToken") } })
      .then((response) => {
        setListOfPosts(response.data.listOfPosts);
        setLikedPosts(response.data.likedPosts.map((like) => {
          return like.PostId;
        }));
      });
    }
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
        if (likedPosts.includes(postId)) {
          setLikedPosts(likedPosts.filter((id) =>{
            return id !== postId;
          }))
        } else {
          setLikedPosts([...likedPosts, postId]);
        }
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
              <div className='buttons'>
                <BsFillHandThumbsUpFill
                  onClick={() => {
                    likeAPost(value.id)
                  }} 
                  className={likedPosts.includes(value.id) ? "unlikeBttn" : "likeBttn"}
                  />
              </div>
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
