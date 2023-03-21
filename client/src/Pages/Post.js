import React, {useEffect, useState, useContext} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios';
import './Post.css';
import { AuthContext } from '../helpers/AuthContext';


function Post() {
    let {id} = useParams(); 
    const [postObject, setPostObject] = useState({}); // post object
    const [reviewList, setReviewList] = useState([]); // list of reviews
    const [newReview, setNewReview] = useState(""); // new review that the user is typing
    const [sum, newSum] = useState(0);
    const [value, setValue] = useState(0);
    const {authState} = useContext(AuthContext);

    useEffect (() => {
        axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
          setPostObject(response.data);
        });

        axios.get(`http://localhost:3001/reviews/${id}`).then((response) => {
          setReviewList(response.data);
        });
    }, []); // empty array means this will only run once and not be called every second

    const addReview = () => {
      axios
      .post("http://localhost:3001/reviews", { // send a post request to the api
        reviewBody: newReview, 
        PostId: id // send the new review and the post id to the api
      }, 
      {
        headers: {
          accessToken: localStorage.getItem("accessToken") // send the accessToken to the api
        },
      }
      )
      .then((response) => { // optimistic update => assume that the api request worked: the data was actually sent to the database
        if (response.data.error) {
          alert(response.data.error);
        } else {
          const reviewToAdd = {
            reviewBody: newReview, 
            username: response.data.username}; // create a new review object
          setReviewList([...reviewList, reviewToAdd]); // add the new review to the list of reviews
                        //-> array destructuring: take all the elements from the array and add them to the new array
          setNewReview(""); // clear the input field
        }
      })
    }

    const deleteReview = (id) => {
      axios.delete(`http://localhost:3001/reviews/${id}`, {
        headers: {accessToken: localStorage.getItem('accessToken') },
      }).then(() => {
        setReviewList(
          reviewList.filter((val)=> {
            return val.id != id;
        })
        );
    });
  };
   
  const onKeyPress = (e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  } 

  return (
    <div className="postPage">
      <div className="post" id="individual">
        <div className="title">{postObject.title}</div>
        <div className="body">{postObject.postText}</div>
        {/* <div className="footer">{postObject.username}</div> */}
      </div>
      <div className="rightSide">
        <div>
          <div className="addReviewContainer">
            <input type="number"
            min="1"
            max="10" 
            placeholder='A grade from 1 to 10' 
            autoComplete='off' 
            value={newReview}
            onChange={(event) => {
              setNewReview(event.target.value)
              setValue(event.target.value)
            }}
            />
              
            <button onClick={addReview}>Add comment</button>
          </div>

          <div className="listOfReviews"></div>
            {reviewList.map((review, key) => {
              
             
              // console.log(value);
              return <div key = {key} className="review"> 
                {review.reviewBody} 
                {/* <label> ~username~ :  {review.username}</label> */}
                {authState.username === review.username  && 
                (<button 
                onClick={() => {
                  deleteReview(review.id);
                  }}
                  > x
                  </button>)}
              </div>
            })}
        </div>
      </div>

    </div>
  )
}

export default Post