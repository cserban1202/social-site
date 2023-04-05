import React, { useContext, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './CreatePost.css';
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

function CreatePost() {
  const { authState } = useContext(AuthContext);

  let history = useNavigate();
  const initialValues = {
    title: "",
    post: "",
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history("/login");
    }
  });
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input title"),
    postText: Yup.string().required("You must input some text!"),
  });

  const onSubmit = (data) => {

    axios.post("http://localhost:3001/posts", data,
      {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        history("/");
      });
  }

  return (
    <div className="createPostPage">

      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className='formContainer'>
          <label>Title: </label>
          <ErrorMessage name="title" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="title"
            placeholder="Ex: Title..." />

          <label>Write something... </label>
          <ErrorMessage name="postText" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="postText"
            placeholder="Ex: Post..." />


          <button type="submit">Create post</button>
        </Form>
      </Formik>
    </div>
  )
}

export default CreatePost
