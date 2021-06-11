import React, {useEffect} from 'react';
import {Formik} from 'formik';
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../redux/actions/authActions";

const Register = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Formik
        initialValues={{email: '', password: '', name: '', firstName: '', lastName: '', photo: ''}}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          if (!values.password) {
            errors.password = 'Required';
          }
          return errors;
        }}

        onSubmit={(values, {setSubmitting}) => {
          dispatch(registerUser(values))
          setSubmitting(false)
        }}
      >
        {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder={'email'}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && errors.email}
            <input
              type="password"
              name="password"
              placeholder={'password'}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
            <input
              type="text"
              name="name"
              placeholder={'name'}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            <input
              type="text"
              name="firstName"
              placeholder={'firstName'}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstName}
            />
            <input
              type="text"
              name="lastName"
              placeholder={'lastName'}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastName}
            />

            <input
              type="text"
              name="photo"
              placeholder={'photo'}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.photo}
            />

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Register;