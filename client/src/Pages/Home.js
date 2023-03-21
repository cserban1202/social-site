import React from 'react';
import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  let history = useNavigate();

    const [listOfPosts, setListOfstPosts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/posts").then((response) => {
          setListOfstPosts(response.data);
        });
      }, [])
      
  return (
    <div>
      
        {listOfPosts.map((value, key) => {
            return (
            <div className="post" onClick={() => {history(`/post/${value.id}`)}}> 
                <div className="title">{value.title} </div>
                <div className="body"> {value.postText} </div>
                {/* <div className="footer "> {value.username} </div> */}
            </div>
        );
    })}
    </div>
  )
}

export default Home