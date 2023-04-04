import React from 'react';
import {Formik, Form, Field, ErrorMessage } from 'formik';
import './CreatePost.css';
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function CreatePost() {
    let history = useNavigate();
    const initialValues = {
        title: "",
        post: "",
        username: ""
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("You must input title"),
        postText: Yup.string().required("You must input some text!"),
        username: Yup.string().min(3).max(15).required()
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/posts", data).then((response) => {
          history("/");
        });
    }

    

  return (
    <div className="createPostPage">

      <Formik initialValues={initialValues} onSubmit ={onSubmit} validationSchema={validationSchema}>
        <Form className='formContainer'>
            <label>Title: </label>
            <ErrorMessage name="title" component="span"/>
            <Field 
            autocomplete="off"
            id="inputCreatePost" 
            name="title" 
            placeholder="Ex: Title..."/>

            <label>Write something... </label>
            <ErrorMessage name="postText" component="span"/>
            <Field 
            autocomplete="off"
            id="inputCreatePost" 
            name="postText" 
            placeholder="Ex: Post..."/>

            <label>Username: </label>
            <ErrorMessage name="username" component="span"/>
            <Field 
            autocomplete="off"
            id="inputCreatePost" 
            name="username" 
            placeholder="Ex: John123.."/>

            <button type="submit">Create post</button>
        </Form>
      </Formik>
    </div>
  )
}

export default CreatePost
