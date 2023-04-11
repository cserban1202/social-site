import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Profile() {

    const [username, setUsername] = useState(''); // This is the username of the profile page we are on
    let { id } = useParams();  // This is the username of the profile page we are on
useEffect(() => {
    axios.get(`http://localhost:3001/auth/basicinfo/${id}`)
    .then((response) => {
        setUsername(response.data.username); // This is the username of the profile page we are on
    })
}, []) 

   
  return (
    <div className='profilePageContainer'>
      <div className='basicInfo'>
        {' '}
        <h1>Username: {username}</h1>
        </div>
      <div className='listOfPosts'></div>
    </div>
  )
}

export default Profile
